import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type ReplyDocument = Reply & Document;

@Schema({ timestamps: true })
export class Reply {
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  pinId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, require: true })
  userId: string;

  @Prop({ require: true })
  userName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  targetReplyId: string | null;

  @Prop({ require: true })
  reply: string;

  @Prop({ default: 0 })
  likeCount: number;

  @Prop({ default: false })
  isLiked: boolean;

  @Prop({ default: 0 })
  hateCount: number;

  @Prop({ default: false })
  isHated: boolean;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
