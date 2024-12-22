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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';

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

  @Get(':id')
  async getFoodById(@Param('id') id: ObjectId) {
    return this.foodService.getFoodById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createFood(
    @Body() body: CreateFoodDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: any,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.foodService.createFood(body, request.user.id, file);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateFood(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateFoodDto: UpdateFoodDto,
    @Req() request: any,
  ) {
    if (request.user.id !== updateFoodDto.userIdCreate) {
      throw new ForbiddenException(
        'You are not authorized to update this food',
      );
    }
    return this.foodService.updateFood(id, updateFoodDto, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeFood(@Param('id') id: string, @Req() request: any) {
    return this.foodService.removeFood(id, request.user.id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getFoodsByUserId(@Param('userId') userIdCreate: string) {
    const response = await this.foodService.getFoodsByUserId(userIdCreate);
    return response;
  }
}
