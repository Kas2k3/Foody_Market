import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from './schemas/food.schema';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import app from 'api-query-params';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<FoodDocument>,
  ) { }

  async createFood(createFoodDto: CreateFoodDto, userIdCreate: string) {
    const food = new this.foodModel({
      ...createFoodDto,
      userIdCreate,
    });

    await food.save();

    return {
      resultMessage: {
        en: 'Food creation successful',
        vn: 'Tạo thực phẩm thành công',
      },
      resultCode: '00160',
      food,
      confirmToken: 'your_confirmation_token',
    };
  }

  async updateFood(updateFoodDto: UpdateFoodDto) {
    const updatedFood = await this.foodModel.findByIdAndUpdate(
      updateFoodDto.id,
      { ...updateFoodDto },
      { new: true },
    );

    return {
      resultMessage: {
        en: 'Food updated successfully',
        vn: 'Cập nhật thực phẩm thành công',
      },
      resultCode: '00101',
      food: updatedFood,
    };
  }

  async removeFood(id: string): Promise<any> {
    await this.foodModel.findByIdAndDelete(id);
    return {
      resultMessage: {
        en: 'Food deletion successfull',
        vn: 'Xóa thực phẩm thành công',
      },
      resultCode: '00184',
    };
  }

  async findAllFood(query: string, current: number, pageSize: number) {
    const { filter, sort } = app(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.foodModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    const results = await this.foodModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any);

    return {
      resultMessage: {
        en: 'Successfull retrieve all foods',
        vn: 'Lấy danh sách thực phẩm thành công',
      },
      resultCode: '00188',
      food: results,
      totalPages,
    };
  }
}