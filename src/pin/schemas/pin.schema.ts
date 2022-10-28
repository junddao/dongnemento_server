import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

export type PinDocument = Pin & Document;

@Schema({ timestamps: true })
export class Pin {
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({ require: true })
  lat: number;

  @Prop({ require: true })
  lng: number;

  @Prop({ require: true })
  title: string;

  images: string[];

  @Prop({ require: true })
  body: string;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const PinSchema = SchemaFactory.createForClass(Pin);
