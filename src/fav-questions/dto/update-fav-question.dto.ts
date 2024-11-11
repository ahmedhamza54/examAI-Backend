import { PartialType } from '@nestjs/mapped-types';
import { CreateFavQuestionDto } from './create-fav-question.dto';

export class UpdateFavQuestionDto extends PartialType(CreateFavQuestionDto) {}
