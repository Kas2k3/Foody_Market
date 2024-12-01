import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum CategoryEnum {
  MEAT = 'Meat',
  VEGETABLE = 'Vegetable',
  TUBER = 'Tuber',
  FRUIT = 'Fruit',
  DAIRY = 'Dairy',
  SPICE = 'Spice',
  OTHER = 'Other',
}

export enum UnitEnum {
  KILOGRAM = 'Kilogram',
  GRAM = 'Gram',
  PACKAGE = 'Package',
  TEASPOON = 'Teaspoon',
  ROOT = 'Root',
  FRUIT_MEASURE = 'Fruit',
  BUNCH = 'Bunch',
  SLICE = 'Slice',
  LEAF = 'Leaf',
  OTHER_UNIT = 'Other',
}

export type FoodDocument = Food & Document;

@Schema({ timestamps: true })
export class Food {
  @Prop({ required: true })
  name: string;

  @Prop()
  imageUrl: string;

  @Prop()
  type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, enum: CategoryEnum })
  category: CategoryEnum;

  @Prop({ required: true, enum: UnitEnum })
  unit: UnitEnum;

  @Prop({ required: true })
  userIdCreate: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
