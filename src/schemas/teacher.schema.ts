import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import { Subject } from '../constants/enum';

export type TeacherDocument = Teacher & Document;
              
@Schema()
export class Teacher {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: Subject })
  specialization: Subject;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
