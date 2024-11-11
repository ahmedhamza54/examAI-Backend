import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { Subject, Grade, Semester } from '../constants/enum';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  async create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
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
