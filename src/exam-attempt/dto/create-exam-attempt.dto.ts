import { IsString, IsNotEmpty, IsNumber, IsArray, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateExamAttemptDto {
  @IsNotEmpty()
  @IsString()
  studentId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  examId: Types.ObjectId;

  //@IsNumber()
 // score: number;

  @IsString()
  answerText: string;

  //@IsDate()
  //attemptDate: Date;
}
