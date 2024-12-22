import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './schemas/food.schema';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
    FoodModule,
  ],
  controllers: [FoodController],
  providers: [FoodService],
  exports: [MongooseModule, FoodService],

})
export class FoodModule { }
