import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Food, FoodDocument } from './schemas/food.schema';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import app from 'api-query-params';
import { FoodCloudinaryService } from '@/modules/cloudinary/food/food.cloudinary';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<FoodDocument>,
    private readonly cloudinaryService: FoodCloudinaryService,
  ) { }

  async createFood(
    createFoodDto: CreateFoodDto,
    userIdCreate: string,
    file: Express.Multer.File,
  ) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);

    const food = new this.foodModel({
      ...createFoodDto,
      userIdCreate,
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
      confirmToken: 'your_confirmation_token',
    };
  }

  async updateFood(
    id: string,
    updateFoodDto: UpdateFoodDto,
    file?: Express.Multer.File, // Tệp có thể không được gửi lên
  ): Promise<any> {
    let imageUrl: string | undefined;

    // Chỉ upload ảnh mới nếu có file
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    // Cập nhật dữ liệu, bỏ qua imageUrl nếu không có tệp mới
    const updateData = imageUrl
      ? { ...updateFoodDto, imageUrl } // Nếu có ảnh mới, thêm imageUrl
      : { ...updateFoodDto };         // Nếu không, chỉ cập nhật DTO

    const updatedFood = await this.foodModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }, // Trả về đối tượng đã được cập nhật
    );

    if (!updatedFood) {
      throw new NotFoundException({
        resultMessage: {
          en: 'Food does not exist.',
          vn: 'Thực phẩm không tồn tại.',
        },
        resultCode: '00194',
      });
    }

    return {
      resultMessage: {
        en: 'Food updated successfully',
        vn: 'Cập nhật thực phẩm thành công',
      },
      resultCode: '00101',
      food: updatedFood,
    };
  }

  async removeFood(id: string, userId: string): Promise<any> {
    const food = await this.foodModel.findById(id);
    if (!food) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Food does not exist.',
          vn: 'Thực phẩm không tồn tại.',
        },
        resultCode: '00194',
      });
    }

    if (userId !== food.userIdCreate.toString()) {
      throw new ForbiddenException(
        'You are not authorized to delete this food',
      );
    }

    await this.foodModel.findByIdAndDelete(id);

    return {
      resultMessage: {
        en: 'Food deletion successful',
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

  async getFoodById(id: ObjectId) {
    const food = await this.foodModel.findById(id).exec();

    if (!food) {
      throw new NotFoundException({
        resultMessage: {
          en: 'Food does not exist.',
          vn: 'Thực phẩm không tồn tại.',
        },
        resultCode: '00208',
      });
    }

    return {
      resultMessage: {
        en: 'Successfull retrieve all foods',
        vn: 'Lấy thông tin thực phẩm thành công',
      },
      resultCode: '00188x',
      food: food,
    };
  }

  async getFoodIdByName(foodName: string): Promise<string> {
    const food = await this.foodModel.findOne({ name: foodName });
    if (!food) {
      throw new NotFoundException({
        resultMessage: {
          en: 'The food with the provided name does not exist.',
          vn: 'Thực phẩm với tên đã cung cấp không tồn tại.',
        },
        resultCode: '00167',
      });
    }
    return food.id.toString();
  }

  async getFoodsByUserId(userIdCreate: string): Promise<any> {
    const foods = await this.foodModel.find({ userIdCreate }).exec();

    if (!foods || foods.length === 0) {
      throw new BadRequestException('No foods found for this user.');
    }

    return {
      resultMessage: {
        en: 'Successfull retrieve all foods',
        vn: 'Lấy danh sách thực phẩm thành công',
      },
      resultCode: '00188',
      foods,
    };
  }
}
