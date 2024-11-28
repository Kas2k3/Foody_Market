import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createFoodDto: CreateFoodDto, @Req() request: any) {
    const userId = request.user._id;
    return await this.foodService.create(createFoodDto, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateFood(@Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.updateFood(updateFoodDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id không hợp lệ');
    }
    return this.foodService.remove(id);
  }
}
