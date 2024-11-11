import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamAttemptController } from './exam-attempt.controller';
import { ExamAttemptService } from './exam-attempt.service';
import { ExamAttempt, ExamAttemptSchema } from '../schemas/exam-attempt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ExamAttempt.name, schema: ExamAttemptSchema }]),
  ],
  controllers: [ExamAttemptController],
  providers: [ExamAttemptService],
  exports: [ExamAttemptService],
})
export class ExamAttemptModule {}
