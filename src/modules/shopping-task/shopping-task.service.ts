import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingTask, ShoppingTaskDocument } from './schemas/shopping-task.schema';
import { ShoppingList, ShoppingListDocument } from '../shopping/schemas/shopping.schema';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class ShoppingTaskService {
  constructor(
    @InjectModel(ShoppingTask.name) private shoppingTaskModel: Model<ShoppingTaskDocument>,
    @InjectModel(ShoppingList.name) private shoppingListModel: Model<ShoppingListDocument>,
  ) {}

  // Create tasks
  async createTasks(createTaskDto: CreateTaskDto) {
    const { listId, tasks } = createTaskDto;

    const createdTasks = tasks.map((task) => ({
      listId,
      foodName: task.foodName,
      quantity: task.quantity,
    }));

    await this.shoppingTaskModel.insertMany(createdTasks);

    return {
      resultMessage: {
        en: 'Add tasks successfully',
        vn: 'Thêm nhiệm vụ thành công',
      },
      resultCode: '00287',
    };
  }

  // Get list of tasks
  async getListOfTasks() {
    const tasks = await this.shoppingTaskModel
      .find()
      .populate({
        path: 'listId',
        model: 'ShoppingList',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'username',
        }, // Chỉ lấy các trường cần thiết
      })
      .exec();

      const formattedTasks = tasks.map((task) => {
        const shoppingList = task.listId as ShoppingList; // Ép kiểu ShoppingList
        const user = shoppingList?.userId as any;
        console.log(task);
        return task;
      });

    return {
      resultMessage: {
        en: 'Get list of shopping lists and tasks successful',
        vn: 'Lấy danh sách các shopping list thành công',
      },
      resultCode: '00292',
      role: 'admin',
      list: formattedTasks,
    };
  }

  // Delete task
  async deleteTask(taskId: string) {
    const deletedTask = await this.shoppingTaskModel.findByIdAndDelete(taskId);
    if (!deletedTask) throw new NotFoundException('Task not found');

    return {
      resultMessage: {
        en: 'Task deletion successful',
        vn: 'Xóa nhiệm vụ thành công',
      },
      resultCode: '00299',
    };
  }

  // Update task
  async updateTask(updateTaskDto: UpdateTaskDto) {
    const { taskId, newFoodName } = updateTaskDto;
    const task = await this.shoppingTaskModel.findById(taskId);
    if (!task) throw new NotFoundException('Task not found');

    task.foodName = newFoodName;
    await task.save();

    return {
      resultMessage: {
        en: 'Task updated successfully',
        vn: 'Cập nhật nhiệm vụ thành công',
      },
      resultCode: '00312',
    };
  }
}
