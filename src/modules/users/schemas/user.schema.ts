import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop()
  name: string;

  @Prop({ default: 'user' })
  type: string;

  @Prop({ default: 'en' })
  language: string;

  @Prop({ type: String, enum: ['male', 'female', null], default: null })
  gender: string | null;

  @Prop({ default: 'US' })
  countryCode: string;

  @Prop({ default: 0 })
  timezone: number;

  @Prop({ type: Date, default: null })
  birthDate: Date | null;

  @Prop({ default: '' })
  photoUrl: string;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  deviceId: string | null;

  @Prop({ default: 0 })
  belongsToGroupAdminId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
