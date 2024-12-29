import app from 'api-query-params';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFridgeItemDto } from '@/modules/fridge/dto/create-fridge.dto';
import { UpdateFridgeItemDto } from '@/modules/fridge/dto/update-fridge.dto';
import {
  FridgeItem,
  FridgeItemDocument,
} from '@/modules/fridge/schemas/fridge.schema';
// import { FoodDocument } from '@/modules/food/schemas/food.schema'
import { FoodService } from '../food/food.service';

@Injectable()
export class FridgeItemService {
  constructor(
    @InjectModel(FridgeItem.name)
    private readonly fridgeItemModel: Model<FridgeItemDocument>,
    // private readonly foodModel: Model<FoodDocument>,
    private readonly foodService: FoodService,
  ) { }

  async createFridgeItem(
    createFridgeItemDto: CreateFridgeItemDto,
    userId: string,
  ): Promise<any> {
    const { foodId, useWithin, ...rest } = createFridgeItemDto;

    // await this.foodService.getFoodsByUserId(userId);
    await this.foodService.getFoodsByUserId(userId);

    if (useWithin <= 0) {
      throw new BadRequestException('useWithin phải là một số dương.');
    }

    const startDate = new Date();

    const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    const expiredDate = new Date(
      startDate.getTime() + useWithin * MILLISECONDS_IN_A_DAY,
    );

    const fridgeItem = new this.fridgeItemModel({
      ...rest,
      userId,
      foodId,
      startDate,
      expiredDate,
    });

    await fridgeItem.save();

    return {
      resultMessage: {
        en: 'Fridge item created successfully.',
        vn: 'Mục trong tủ lạnh được tạo thành công.',
      },
      resultCode: '00202',
      fridgeItem,
    };
  }

  async updateFridgeItem(updateFridgeItemDto: UpdateFridgeItemDto) {
    const updatedFood = await this.fridgeItemModel.findByIdAndUpdate(
      updateFridgeItemDto.id,
      { ...updateFridgeItemDto },
      { new: true },
    );

    return {
      resultMessage: {
        en: 'Fridge item updated successfully.',
        vn: 'Mục trong tủ lạnh được cập nhật thành công.',
      },
      food: updatedFood,
    };
  }

  async removeFridgeItem(id: string): Promise<any> {
    const fridge = await this.fridgeItemModel.findById(id);
    if (!fridge) {
      throw new BadRequestException('Food not found');
    }

    await this.fridgeItemModel.findByIdAndDelete(id);

    return {
      resultMessage: {
        en: 'Fridge item deleted successfully.',
        vn: 'Xóa mục trong tủ lạnh thành công.',
      },
      resultCode: '00224',
    };
  }

  async findAllFridgeItem(query: string, current: number, pageSize: number) {
    const { filter, sort } = app(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.fridgeItemModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    const results = await this.fridgeItemModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any)
      .populate('foodId');

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

  async getSpecificItem(id: string): Promise<any> {
    const fridgeItem = await this.fridgeItemModel
      .findById(id)
      .populate('foodId')
      .exec();

    return {
      resultMessage: {
        en: 'Get specific item successful',
        vn: 'Lấy item cụ thể thành công',
      },
      resultCode: '00237',
      item: {
        ...fridgeItem.toObject(),
      },
    };
  }

  async getItemsNearExpiration(): Promise<FridgeItem[]> {
    const today = new Date();
    const warningDate = new Date();
    warningDate.setDate(today.getDate() + 3); // Sắp hết hạn trong 3 ngày

    return this.fridgeItemModel
      .find({
        expired: { $gte: today, $lte: warningDate },
      })
      .exec();
  }

  async getExpiredItems(): Promise<FridgeItem[]> {
    const today = new Date();
    return this.fridgeItemModel
      .find({
        expired: { $lt: today },
      })
      .exec();
  }
}
