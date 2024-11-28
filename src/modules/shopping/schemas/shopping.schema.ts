import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShoppingListDocument = ShoppingList & Document;

@Schema({ timestamps: true })
export class ShoppingList {
  @Prop({ required: true })
  name: string;

  @Prop()
  note: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  belongsToGroupAdminId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  assignedToUserId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
