import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from './schemas/plan.schema';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Food, FoodSchema } from '../food/schemas/food.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plan.name, schema: PlanSchema },
      { name: Food.name, schema: FoodSchema },
    ]),
  ],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
