import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ShoppingList } from '../../shopping/schemas/shopping.schema';

export type ShoppingTaskDocument = ShoppingTask & Document;

@Schema({ timestamps: true })
export class ShoppingTask {
  @Prop({ type: Types.ObjectId, ref: 'ShoppingList', required: true })
  listId: Types.ObjectId | ShoppingList; // Thêm kiểu ShoppingList sau populate()

  @Prop({ required: true })
  foodName: string;

  @Prop({ required: true })
  quantity: string;
}

export const ShoppingTaskSchema = SchemaFactory.createForClass(ShoppingTask);
