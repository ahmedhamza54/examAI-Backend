import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamAttempt } from '../schemas/exam-attempt.schema';
import { CreateExamAttemptDto } from './dto/create-exam-attempt.dto';

@Injectable()
export class ExamAttemptService {
  constructor(@InjectModel(ExamAttempt.name) private examAttemptModel: Model<ExamAttempt>) {}

  async create(createExamAttemptDto: CreateExamAttemptDto): Promise<ExamAttempt> {
    const attempt = new this.examAttemptModel(createExamAttemptDto);
    return await attempt.save();
  }
}
