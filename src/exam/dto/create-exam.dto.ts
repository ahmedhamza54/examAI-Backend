import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  grade: string; // Enum: 'Grade 10', 'Grade 11', etc.

  @IsNotEmpty()
  @IsString()
  semester: string; // Enum: 'Fall', 'Spring'

  @IsArray()
  chapters: string[];

  @IsString()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  difficultyLevel: number; // Range from 1 to 10

  @IsString()
  prompt: string;

  @IsNotEmpty()
  @IsString()
  teacherId: string;
}
