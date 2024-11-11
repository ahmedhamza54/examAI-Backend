import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam } from '../schemas/exam.schema';
import { CreateExamDto } from './dto/create-exam.dto';
import { ChaptersMap } from '../constants/chapters.constants';
import { Subject, Grade, Semester } from '../constants/enum';

@Injectable()
export class ExamService {
  constructor(@InjectModel(Exam.name) private examModel: Model<Exam>) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const newExam = new this.examModel(createExamDto);
    return await newExam.save();
  }

  async findAll(): Promise<Exam[]> {
    return this.examModel.find().exec();
  }
  getChapters(
    subject: Subject,
    grade: Grade,
    semester: Semester
  ): string[] {
    const subjectData = ChaptersMap[subject];
    if (!subjectData) return [];

    const gradeData = subjectData[grade];
    if (!gradeData) return [];

    const chapters = gradeData[semester];
    return chapters || [];
  }
}
