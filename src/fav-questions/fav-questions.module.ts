import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavQuestionsController } from './fav-questions.controller';
import { FavQuestionsService } from './fav-questions.service';
import { FavQuestions, FavQuestionsSchema } from '../schemas/fav-questions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FavQuestions.name, schema: FavQuestionsSchema }]),
  ],
  controllers: [FavQuestionsController],
  providers: [FavQuestionsService],
  exports: [FavQuestionsService],
})
export class FavQuestionsModule {}
