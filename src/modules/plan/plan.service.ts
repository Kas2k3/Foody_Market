import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Plan, PlanDocument } from './schemas/plan.schema';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import app from 'api-query-params';
import { Food, FoodDocument } from '../food/schemas/food.schema';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan.name) private readonly planModel: Model<PlanDocument>,
    @InjectModel(Food.name) private readonly foodModel: Model<FoodDocument>,
  ) { }

  // Create a Plan
  async createPlan(createPlanDto: CreatePlanDto, userId: string) {
    const food = await this.findOrCreateFood(createPlanDto.foodName);
    
    const plan = new this.planModel({
      name: createPlanDto.name,
      timestamp: new Date(createPlanDto.timestamp),
      status: 'pending',
      foodId: food.id,
      userId,
    });

    await plan.save();

    return {
      resultMessage: {
        en: 'Meal plan created successfully',
        vn: 'Tạo kế hoạch ăn uống thành công',
      },
      resultCode: '00322',
      newPlan: {
        id: plan.id,
        name: plan.name,
        timestamp: plan.timestamp,
        status: plan.status,
        foodId: food,
        userId: plan.userId,
        updatedAt: plan.updatedAt,
        createdAt: plan.createdAt,
      },
    };
  }

  private async findOrCreateFood(foodName: string) {
    // Simulated Food model and operation (adjust based on your actual implementation)
    const food = await this.foodModel.findOne({ name: foodName }); // Replace with actual Food model
    if (!food) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Food does not exist.',
          vn: 'Thực phẩm không tồn tại.',
        },
        resultCode: '00208',
      });
    }
    return food;
  }

  // Update a Plan plan
  async updatePlan(id: string, updatePlanDto: UpdatePlanDto) {

    const food = await this.findOrCreateFood(updatePlanDto.newFoodName);
    const updateData: Partial<Plan> = {};
    if (food) {
      updateData.foodId = new Types.ObjectId(food.id.toString());
    }
    updateData.name = updatePlanDto.newName;

    updateData.updatedAt = new Date();

    const updatedPlan = await this.planModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    if (!updatedPlan) {
      throw new NotFoundException({
        resultMessage: {
          en: 'No plan found with the provided ID.',
          vn: 'Không tìm thấy kế hoạch với ID đã cung cấp.',
        },
        resultCode: '00337',
      });
    }

    return {
      resultMessage: {
        en: 'Plan plan updated successfully',
        vn: 'Cập nhật kế hoạch ăn uống thành công',
      },
      resultCode: '00344',
      Plan: {
        id: updatedPlan._id,
        name: updatedPlan.name,
        timestamp: updatedPlan.timestamp,
        status: updatedPlan.status,
        foodId: food,
        userId: updatedPlan.userId,
        updatedAt: updatedPlan.updatedAt,
        createdAt: updatedPlan.createdAt,
      },
    };
  }

  // Delete a Plan plan
  async removePlan(id: string) {
    const deletedPlan = await this.planModel.findByIdAndDelete(id);

    if (!deletedPlan) {
      throw new NotFoundException('Plan plan not found');
    }

    return {
      resultMessage: {
        en: 'Plan plan deletion successful',
        vn: 'Xóa kế hoạch ăn uống thành công',
      },
      resultCode: '00330',
    };
  }

  async findPlansByDate(date: string) {
    // Validate the date
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Invalid date format.',
          vn: 'Định dạng ngày không hợp lệ.',
        },
        resultCode: '00242',
      });
    }

    // Find plans matching the given date (ignoring time)
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const plans = await this.planModel.find({
      timestamp: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate('foodId')  // Populate chi tiết thông tin foodId
      .exec();
    return {
      resultMessage: {
        en: 'Meal plans retrieved successfully',
        vn: 'Lấy kế hoạch ăn uống thành công',
      },
      resultCode: '00348',
      plans,
    };
  }
}
