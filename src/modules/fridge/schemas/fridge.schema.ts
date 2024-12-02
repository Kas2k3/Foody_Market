import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FridgeItemDocument = FridgeItem & Document;

@Schema({ timestamps: true })
export class FridgeItem {
  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  useWithin: number;

  @Prop()
  note: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  expiredDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Food', required: true })
  foodId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const FridgeItemSchema = SchemaFactory.createForClass(FridgeItem);
