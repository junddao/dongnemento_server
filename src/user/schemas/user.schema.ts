import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  id: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firebaseToken: string;

  @Prop()
  social: string;

  @Prop()
  name: string;

  @Prop()
  introduce: string;

  @Prop()
  profileImage: string | null;

  @Prop()
  pushEnabled: boolean;

  @Prop()
  isBlocked: boolean;

  @Prop()
  lat: number | null;

  @Prop()
  lng: number | null;

  @Prop()
  address: string | null;

  @Prop()
  blockedUserIds: string[] | null;

  @Prop()
  status: string;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: Date.now, type: mongoose.Schema.Types.Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
