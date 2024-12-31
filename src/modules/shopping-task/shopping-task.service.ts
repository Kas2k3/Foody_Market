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
          path: 'userId assignedToUserId',
          model: 'User',
          select: 'username',
        }, // Chỉ lấy các trường cần thiết
      })
      .exec();

      const formattedTasks = tasks.map((task) => {
        const shoppingList = task.listId as ShoppingList; // Ép kiểu ShoppingList
        const user = shoppingList?.userId as any;
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

  async getTasksByUserId(userId: string) {
    const tasks = await this.shoppingTaskModel
      .find()
      .populate({
        path: 'listId',
        model: 'ShoppingList',
        match: { 
          $or: [
            { assignedToUserId: userId }, 
            { userId }
          ]
        },
        populate: {
          path: 'userId assignedToUserId',
          model: 'User',
          select: 'username',
        }
      })
      .exec();
  
    const filteredTasks = tasks.filter((task) => task.listId !== null); // Loại bỏ task không thuộc userId
  
    return {
      resultMessage: {
        en: 'Tasks retrieved successfully',
        vn: 'Lấy nhiệm vụ thành công',
      },
      resultCode: '00295',
      tasks: filteredTasks,
    };
  }

  async updateTaskStatus(taskId: string, status: boolean) {
    const task = await this.shoppingTaskModel.findById(taskId);
    if (!task) throw new NotFoundException({
      resultMessage: {
        en: 'No task found with the provided ID.',
        vn: 'Không tìm thấy nhiệm vụ với ID đã cung cấp.',
      },
      resultCode: '00306',
    });
  
    task.status = status;
    await task.save();
  
    return {
      resultMessage: {
        en: 'Task status updated successfully',
        vn: 'Cập nhật trạng thái nhiệm vụ thành công',
      },
      resultCode: '00315',
    };
  }  

  // Delete task
  async deleteTask(taskId: string) {
    const deletedTask = await this.shoppingTaskModel.findByIdAndDelete(taskId);
    if (!deletedTask) throw new NotFoundException({
      resultMessage: {
        en: 'No task found with the provided ID.',
        vn: 'Không tìm thấy nhiệm vụ với ID đã cung cấp.',
      },
      resultCode: '00296',
    });

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
    if (!task) throw new NotFoundException({
      resultMessage: {
        en: 'No task found with the provided ID.',
        vn: 'Không tìm thấy nhiệm vụ với ID đã cung cấp.',
      },
      resultCode: '00306',
    });

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
