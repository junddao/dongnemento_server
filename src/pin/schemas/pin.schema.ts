import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PinDocument = Pin & Document;

@Schema({ timestamps: true })
export class Pin {
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
  })
  authorUser: User;

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

  @Prop({ default: 0 })
  likeCount: number;

  @Prop({ default: false })
  isLiked: boolean;

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
