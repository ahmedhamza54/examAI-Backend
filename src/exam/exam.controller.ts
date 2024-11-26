import { Controller, Post, Get, Body, Query,Param,Delete } from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { Subject, Grade, Semester } from '../constants/enum';
import { Exam } from '../schemas/exam.schema';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  async createExam(@Body() examDto: CreateExamDto): Promise<{ id: string; text: string }> {
    const result = await this.examService.createExam(examDto);
    return result;
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
  
  @Get(':id')
async getExam(@Param('id') id: string): Promise<Exam> {
  return this.examService.findById(id);
}
@Delete(':id')
async deleteExam(@Param('id') id: string): Promise<{ message: string }> {
  await this.examService.deleteById(id);
  return { message: `Exam with ID ${id} has been successfully deleted.` };
}


  @Get()
  async findAll() {
    return this.examService.findAll();
  }

 
  @Post('regenerate')
  async regenerateExam(@Body() updateExamDto: { id: string; text: string; prompt: string }): Promise<{ id: string; text: string }> {
    const result = await this.examService.regenerateExam(updateExamDto);
    return result;
  }
  
}


