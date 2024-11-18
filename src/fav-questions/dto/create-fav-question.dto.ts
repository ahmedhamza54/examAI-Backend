import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFavQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  chapter: string;

  teacherId: string;
}
