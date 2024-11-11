import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { Grade } from '../constants/enum';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: Grade })
  grade: Grade;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
