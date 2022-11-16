import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

export type HateDocument = Hate & Document;

@Schema({ timestamps: true })
export class Hate {
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pin', required: true })
  pinId: ObjectId | null;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Reply', required: true })
  // replyId: ObjectId | null;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const HateSchema = SchemaFactory.createForClass(Hate);
