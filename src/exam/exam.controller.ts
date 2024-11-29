import { Controller, Post, Get, Body, Query,Param,Delete,Put   } from '@nestjs/common';
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
  @Put(':id')
  async updateExam(
    @Param('id') id: string,
    @Body('text') text: string,
  ): Promise<{ message: string; updatedExam: Exam }> {
    const updatedExam = await this.examService.updateExam(id, text);
    return {
      message: `Exam with ID ${id} has been successfully updated.`,
      updatedExam,
    };
  }

  @Post('correct/:id')
async correctExam(
  @Param('id') examId: string,
  @Body('attempt') examAttempt: string,
): Promise<{ message: string; correction: string }> {
  const correction = await this.examService.correctExam(examId, examAttempt);
  return {
    message: 'Correction completed successfully.',
    correction,
  };
}

  
}


