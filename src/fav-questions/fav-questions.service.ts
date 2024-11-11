import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavQuestions } from '../schemas/fav-questions.schema';
import { CreateFavQuestionDto } from './dto/create-fav-question.dto';
import { UpdateFavQuestionDto } from './dto/update-fav-question.dto';

@Injectable()
export class FavQuestionsService {
  constructor(
    @InjectModel(FavQuestions.name) private favQuestionsModel: Model<FavQuestions>,
  ) {}

  async create(createFavQuestionsDto: CreateFavQuestionDto): Promise<FavQuestions> {
    const newQuestion = new this.favQuestionsModel(createFavQuestionsDto);
    return newQuestion.save();
  }

  async findAll(): Promise<FavQuestions[]> {
    return this.favQuestionsModel.find().populate('teacherId').exec();
  }

  async findOne(id: string): Promise<FavQuestions> {
    return this.favQuestionsModel.findById(id).populate('teacher').exec();
  }

  async update(
    id: string,
    updateFavQuestionsDto: UpdateFavQuestionDto,
  ): Promise<FavQuestions> {
    return this.favQuestionsModel.findByIdAndUpdate(id, updateFavQuestionsDto, {
      new: true,
    }).exec();
  }

  async remove(id: string): Promise<FavQuestions> {
    return this.favQuestionsModel.findByIdAndDelete(id).exec();
  }
}
