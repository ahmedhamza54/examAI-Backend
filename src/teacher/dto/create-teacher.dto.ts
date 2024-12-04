import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  userId: Types.ObjectId;

  @IsArray()
  @IsOptional()
  favoriteQuestions: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  exams: Types.ObjectId[];

  @IsString()
  @IsOptional()
  specialization: Types.ObjectId;
}
