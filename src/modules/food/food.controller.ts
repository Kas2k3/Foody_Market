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
  Get,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.foodService.findAllFood(query, +current, +pageSize);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createFood(@Body() createFoodDto: CreateFoodDto, @Req() request: any) {
    const userIdCreate = request.user._id;
    return await this.foodService.createFood(createFoodDto, userIdCreate);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateFood(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto,
    @Req() request: any,
  ) {
    if (request.user._id !== updateFoodDto.userIdCreate) {
      throw new ForbiddenException(
        'You are not authorized to update this food',
      );
    }
    return this.foodService.updateFood(updateFoodDto);
  }

  @Delete(':id')
  async removeFood(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id không hợp lệ');
    }
    return this.foodService.removeFood(id);
  }
}
