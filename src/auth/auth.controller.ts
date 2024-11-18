import { Body, Controller, Post, Put, Req, UseGuards ,NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { EmailDto } from './dtos/email.dto';

@ApiTags('auth') // Group all endpoints under 'auth' in Swagger UI
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User signup' }) // Summary for the endpoint
  @ApiBody({ type: SignupDto, description: 'User signup data' }) // Document the request body
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto, description: 'User login credentials' })
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiBody({ type: RefreshTokenDto, description: 'Refresh token payload' })
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @UseGuards(AuthenticationGuard)
  @Put('change-password')
  @ApiBearerAuth() // Add bearer authentication requirement
  @ApiOperation({ summary: 'Change password' })
  @ApiBody({
    type: ChangePasswordDto,
    description: 'Old and new password for changing user password',
  })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    return this.authService.changePassword(
      req.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Forgot password' })
  @ApiBody({
    type: ForgotPasswordDto,
    description: 'Email address to initiate password reset',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Put('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiBody({
    type: ResetPasswordDto,
    description: 'New password and reset token for password reset',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }
  @Post('get-name')
  @ApiOperation({ summary: 'Retrieve user name by email' })
  @ApiBody({
    type: EmailDto,
    description: 'Email address to fetch the user name',
  })
  async getProfileByEmail(@Body() emailDto: EmailDto) {
    const userName = await this.authService.getNameByEmail(emailDto.email);

    if (!userName) {
      throw new NotFoundException('User not found');
    }

    return { name: userName };
  }

}
