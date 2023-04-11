import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type HateDocument = Hate & Document;

@Schema({ timestamps: true })
export class Hate {
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pin', required: true })
  pinId: string | null;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Reply', required: true })
  // replyId: ObjectId | null;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const HateSchema = SchemaFactory.createForClass(Hate);
