import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  Logger
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectModel ,Types } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';
// Import nanoid dynamically to handle ESM module
const nanoidImport = () => import('nanoid');
import { ResetToken } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service'; 
import { RolesService } from 'src/roles/roles.service';
import { Teacher, TeacherDocument } from 'src/schemas/teacher.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    @InjectModel(ResetToken.name)
    private ResetTokenModel: Model<ResetToken>,
    private jwtService: JwtService,
    private mailService: MailService,
    private rolesService: RolesService,
    @InjectModel(Teacher.name) 
    private TeacherModel: Model<TeacherDocument>,
  ) {}

  async signup(signupData: SignupDto) {
    const { email, password, name, role } = signupData;

    // Check if email is in use
    const emailInUse = await this.UserModel.findOne({
      email,
    });
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document and save in MongoDB
    return await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    // Find if user exists by email
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Compare entered password with existing password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Generate JWT tokens
    const tokens = await this.generateUserTokens(user._id);
    const userId = user._id.toString()
  
    const teacher = await this.TeacherModel.findOne({ userId }).exec();
    const specialization = (await this.TeacherModel.findById(teacher._id).exec()).specialization

    if (!teacher) {
      throw new Error(`Teacher not found for user ID: ${user._id} `);
    }

    return {
      ...tokens,
      userId: user._id,
      teacherId:teacher._id,
      specialization:specialization
    };
  }

  async changePassword(userId, oldPassword: string, newPassword: string) {
    // Find the user
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found...');
    }

    // Compare the old password with the password in DB
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Change user's password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();
  }

  async forgotPassword(email: string) {
    // Check that user exists
    const user = await this.UserModel.findOne({ email });

    if (user) {
      // If user exists, generate password reset link
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      // Dynamically import nanoid
      const { nanoid } = await nanoidImport();
      const resetToken = nanoid(64);

      await this.ResetTokenModel.create({
        token: resetToken,
        userId: user._id,
        expiryDate,
      });

      // Send the link to the user by email
      this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    return { message: 'If this user exists, they will receive an email' };
  }

  async resetPassword(newPassword: string, resetToken: string) {
    // Find a valid reset token document
    const token = await this.ResetTokenModel.findOneAndDelete({
      token: resetToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid link');
    }

    // Change user password (MAKE SURE TO HASH!!)
    const user = await this.UserModel.findById(token.userId);
    if (!user) {
      throw new InternalServerErrorException();
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh Token is invalid');
    }
    return this.generateUserTokens(token.userId);
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '10h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId: string) {
    // Calculate expiry date 3 days from now
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      {
        upsert: true,
      },
    );
  }

  async getUserFromTeacherId(teacherId: String){
    const teacher = await this.TeacherModel.findById(teacherId).exec();
    return this.UserModel.findById(teacher.userId).exec();
  }

  async getUserPermissions(userId: string) {
    const user = await this.UserModel.findById(userId);

    if (!user) throw new BadRequestException();

    const role = null; // Implement roles logic
    return role.permissions;
  }

  async getNameByEmail(email: string): Promise<string | null> {
    const user = await this.UserModel.findOne({ email }); // Correct Mongoose query
    return user ? user.name : null;
  }
  
}
