import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food, FoodDocument } from './schemas/food.schema';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<FoodDocument>) { }

  async create(createFoodDto: CreateFoodDto, userId: string) {
    const { name, category, quantity, unit, imageUrl } = createFoodDto;

    const food = new this.foodModel({
      name,
      unit,
      quantity,
      category,
      imageUrl,
    });

    await food.save();

    return {
      resultMessage: {
        en: 'Food creation successful',
        vn: 'Tạo thực phẩm thành công',
      },
      resultCode: '00160',
      food,
      user: userId,
      confirmToken: 'your_confirmation_token',
    };
  }

  async updateFood(updateFoodDto: UpdateFoodDto): Promise<any> {
    const { id, name, category, quantity, unit, imageUrl } = updateFoodDto;

    const updatedFood = await this.foodModel.findByIdAndUpdate(
      id,
      {
        name,
        category,
        unit,
        quantity,
        imageUrl,
      },
      { new: true },
    );

    return {
      resultMessage: {
        en: 'Successfully',
        vn: 'Thành công',
      },
      resultCode: '00178',
      food: updatedFood,
    };
  }

  async remove(id: string): Promise<any> {
    await this.foodModel.findByIdAndDelete(id);
    return {
      resultMessage: {
        en: 'Food deletion successfull',
        vn: 'Xóa thực phẩm thành công',
      },
      resultCode: '00184',
    };
  }
}
