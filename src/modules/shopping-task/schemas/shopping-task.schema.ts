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

  @Prop({ default: false }) // false: chưa hoàn thành, true: hoàn thành
  status: boolean;

}

export const ShoppingTaskSchema = SchemaFactory.createForClass(ShoppingTask);
