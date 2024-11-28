import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema({ timestamps: true })
export class Food {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  imageUrl: string;

  @Prop()
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'FoodCategory' })
  foodCategoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'UnitOfMeasurement' })
  unitOfMeasurementId: Types.ObjectId;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
