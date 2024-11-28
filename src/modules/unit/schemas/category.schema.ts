import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UnitDocument = Unit & Document;

@Schema({ timestamps: true })
export class Unit {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  unitName: string;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
