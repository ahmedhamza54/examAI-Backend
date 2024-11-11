import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  userId: Types.ObjectId;

  @IsArray()
  @IsOptional()
  examAttempts: Types.ObjectId[];

  @IsString()
  @IsOptional()
  grade: string; // e.g., 'Grade 10'
}
