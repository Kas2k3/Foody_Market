import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true })
  idGroup: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  note: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  belongsToGroupAdminId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  assignedToUserId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
