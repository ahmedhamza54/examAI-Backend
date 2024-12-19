import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';
import { ResetToken, ResetTokenSchema } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service';
import { RolesModule } from 'src/roles/roles.module';
import { Teacher, TeacherSchema } from '../schemas/teacher.schema'
import { Student, StudentSchema } from 'src/schemas/student.schema';

@Module({
  imports: [
    RolesModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
      {
        name: ResetToken.name,
        schema: ResetTokenSchema,
      },
      {
        name: Teacher.name, // Register Teacher schema
        schema: TeacherSchema,
      },
      {
        name: Student.name, // Register Teacher schema
        schema: StudentSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService],
  exports: [AuthService],
})
export class AuthModule {}
