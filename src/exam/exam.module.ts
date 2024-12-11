import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { Exam, ExamSchema } from '../schemas/exam.schema';
import {ExamAttempt,ExamAttemptSchema } from '../schemas/exam-attempt.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema },
      { name: ExamAttempt.name, schema: ExamAttemptSchema }],
    ),
  ],
  controllers: [ExamController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}
