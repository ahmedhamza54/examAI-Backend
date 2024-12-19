import { Controller, Post,Get, Body, Param } from '@nestjs/common';
import { ExamAttemptService } from './exam-attempt.service';
import { CreateExamAttemptDto } from './dto/create-exam-attempt.dto';
import {ExamAttempt} from './entities/exam-attempt.entity'

@Controller('exam-attempts')
export class ExamAttemptController {
  constructor(private readonly examAttemptService: ExamAttemptService) {}

  @Post()
  async create(@Body() createExamAttemptDto: CreateExamAttemptDto) {
    return this.examAttemptService.create(createExamAttemptDto);
  }
  @Get(':studentId')
  async getAllExamAttempts(@Param('studentId') studentId: string): Promise<ExamAttempt[]> {
    return await this.examAttemptService.getAllExamAttempts(studentId);
  }

}
