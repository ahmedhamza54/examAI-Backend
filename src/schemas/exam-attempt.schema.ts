import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

export type ExamAttemptDocument = ExamAttempt & Document;

@Schema()
export class ExamAttempt {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Exam', required: true })
  examId: Types.ObjectId;

  @Prop()
  score: number;

  @Prop()
  answerText: string;

  @Prop({ default: Date.now })
  attemptDate: Date;


}

export const ExamAttemptSchema = SchemaFactory.createForClass(ExamAttempt);
