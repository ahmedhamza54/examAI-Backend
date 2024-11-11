import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';

export type FavQuestionsDocument = FavQuestions & Document;

@Schema()
export class FavQuestions {
  @Prop({ type: Types.ObjectId, ref: 'Teacher', required: false })
  teacherId: Types.ObjectId;

  @Prop({ required: true })
  question: string;

  @Prop()
  chapter: string;
}

export const FavQuestionsSchema = SchemaFactory.createForClass(FavQuestions);
