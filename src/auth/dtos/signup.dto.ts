import { IsEmail, IsString, Matches, MinLength,IsIn } from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
  password: string;

  @IsIn(['teacher', 'student'], { message: 'Role must be either "teacher" or "student"' })
  role: string;
}
