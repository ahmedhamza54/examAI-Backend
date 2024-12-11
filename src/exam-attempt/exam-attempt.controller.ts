import { Controller, Post,Get, Body } from '@nestjs/common';
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
  @Get()
  async getAllExamAttempts(): Promise<ExamAttempt[]> {
    return await this.examAttemptService.getAllExamAttempts();
  }
}
