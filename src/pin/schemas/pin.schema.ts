import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import CategoryType from '../enum/category_types';
import { User } from './../../user/schemas/user.schema';

export type PinDocument = Pin &
  Document & {
    authorUser: User | null;
  };

@Schema({ timestamps: true })
export class Pin {
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: string;

  @Prop({ require: true })
  lat: number;

  @Prop({ require: true })
  lng: number;

  @Prop({ require: true })
  title: string;

  @Prop({ require: true })
  images: string[] | null;

  @Prop({ require: true })
  body: string;

  @Prop({ require: true, type: String, enum: Object.values(CategoryType) })
  category: CategoryType;

  @Prop({ require: true })
  categoryScore: number;

  @Prop({ default: 0 })
  likeCount: number;

  @Prop({ default: false })
  isLiked: boolean;

  @Prop({ default: 0 })
  replyCount: number | null;

  @Prop({ default: 0 })
  hateCount: number;

  @Prop({ default: false })
  isHated: boolean;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const PinSchema = SchemaFactory.createForClass(Pin);

PinSchema.virtual('authorUser', {
  ref: 'User', // 참조할 collections
  localField: 'userId', // 현재 스키마에 선언되어 있는 참조할 필드
  foreignField: '_id', // collections에서 참조할 필드
  justOne: true, // 하나만 반환하는지 여부
});
