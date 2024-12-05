import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PlanDocument = Plan & Document;

@Schema({ timestamps: true })
export class Plan {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Date })
  timestamp: Date;

  @Prop({ required: true })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Food', required: true })
  foodId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
  
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
