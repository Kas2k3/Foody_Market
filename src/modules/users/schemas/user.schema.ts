import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  id: Types.ObjectId;
  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop()
  name: string;

  @Prop({ type: String, enum: ['USER', 'ADMIN', null], default: null })
  type: string;

  @Prop({ default: 'en' })
  language: string;

  @Prop({ type: String, enum: ['MALE', 'FEMALE', null], default: null })
  gender: string | null;

  @Prop({ default: 'US' })
  countryCode: string;

  @Prop({ default: 0 })
  timezone: number;

  @Prop({ type: Date, default: null })
  birthDate: Date | null;

  @Prop({ default: '' })
  photoUrl: string;

  @Prop()
  accountType: string;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop()
  codeId: string;

  @Prop()
  codeExpired: Date;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  deviceId: string | null;

  @Prop({ default: 0 })
  belongsToGroupAdminId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
