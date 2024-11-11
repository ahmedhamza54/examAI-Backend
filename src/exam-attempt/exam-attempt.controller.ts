import { Controller, Post, Body } from '@nestjs/common';
import { ExamAttemptService } from './exam-attempt.service';
import { CreateExamAttemptDto } from './dto/create-exam-attempt.dto';

@Controller('exam-attempts')
export class ExamAttemptController {
  constructor(private readonly examAttemptService: ExamAttemptService) {}

  @Post()
  async create(@Body() createExamAttemptDto: CreateExamAttemptDto) {
    return this.examAttemptService.create(createExamAttemptDto);
  }
}
