import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FridgeItem,
  FridgeItemSchema,
} from '@/modules/fridge/schemas/fridge.schema';
import { FridgeItemService } from '@/modules/fridge/fridge.service';
import { FridgeItemController } from '@/modules/fridge/fridge.controller';
import { FoodModule } from '@/modules/food/food.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FridgeItem.name, schema: FridgeItemSchema },
    ]),
    FoodModule,
  ],
  controllers: [FridgeItemController],
  providers: [FridgeItemService],
})
export class FridgeItemModule { }