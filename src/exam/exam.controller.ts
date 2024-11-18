import { Controller, Post, Get, Body, Query,Param } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { Subject, Grade, Semester } from '../constants/enum';
import { Exam } from '../schemas/exam.schema';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  async createExam(@Body() examDto: CreateExamDto): Promise<{ text: string }> {
    const text = await this.examService.createExam(examDto);
    return { text };
  }
  
  @Get(':id')
async getExam(@Param('id') id: string): Promise<Exam> {
  return this.examService.findById(id);
}

  @Get()
  async findAll() {
    return this.examService.findAll();
  }

  @Get('chapters')
  getChapters(
    @Query('subject') subject: Subject,
    @Query('grade') grade: Grade,
    @Query('semester') semester: Semester
  ) {
    return this.examService.getChapters(
      subject as Subject,
      grade as Grade,
      semester as Semester
    );
  }
}
