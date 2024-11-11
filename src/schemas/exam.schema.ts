import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { Subject, Grade } from '../constants/enum';

export type ExamDocument = Exam & Document;

@Schema()
export class Exam {
  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
  teacherId: Types.ObjectId;

  @Prop({ required: true, enum: Subject })
  subject: Subject;

  @Prop({ required: true, enum: Grade })
  grade: Grade;

  @Prop()
  chapters: string[];

  @Prop({required: false})
  text: string;

  @Prop({ required: true, min: 1, max: 10 })
  difficultyLevel: number;

  @Prop()
  prompt: string;
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
