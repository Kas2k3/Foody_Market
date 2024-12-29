import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ShoppingTaskService } from './shopping-task.service';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { CreateTaskDto, DeleteTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('shopping/task')
@UseGuards(JwtAuthGuard)
export class ShoppingTaskController {
  constructor(private readonly shoppingTaskService: ShoppingTaskService) {}

  @Post()
  async createTasks(@Body() createTaskDto: CreateTaskDto) {
    return this.shoppingTaskService.createTasks(createTaskDto);
  }

  @Get()
  async getListOfTasks() {
    return this.shoppingTaskService.getListOfTasks();
  }

  @Get('user/:userId')
  async getTasksByUserId(@Param('userId') userId: string) {
    return this.shoppingTaskService.getTasksByUserId(userId);
  }

  @Put('mark')
  async updateTaskStatus(
    @Body() body: { taskId: string; status: string },
  ) {
    const { taskId, status } = body;
    if (!taskId) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide a task ID in the taskId field.',
          vn: 'Vui lòng cung cấp một ID nhiệm vụ trong trường taskId.',
        },
        resultCode: '00301',
      });
    }
    if (status !== 'true' && status !== 'false') {
      throw new BadRequestException({
        resultMessage: {
          en: 'Invalid status value. Use "true" or "false".',
          vn: 'Vui lòng nhập đúng giá trị cho status',
        },
        resultCode: '00301',
      });
    }    
    const booleanStatus = status == 'true';
    return this.shoppingTaskService.updateTaskStatus(taskId, booleanStatus);
  }

  @Delete()
  async deleteTask(@Body() deleteTaskDto: DeleteTaskDto) {
    const { taskId } = deleteTaskDto;
    if (!taskId) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide a task ID in the taskId field.',
          vn: 'Vui lòng cung cấp một ID nhiệm vụ trong trường taskId.',
        },
        resultCode: '00301',
      });
    }
    return this.shoppingTaskService.deleteTask(taskId);
  }

  @Put()
  async updateTask(@Body() updateTaskDto: UpdateTaskDto) {
    const { taskId } = updateTaskDto;
    if (!taskId) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide a task ID in the taskId field.',
          vn: 'Vui lòng cung cấp một ID nhiệm vụ trong trường taskId.',
        },
        resultCode: '00301',
      });
    }
    return this.shoppingTaskService.updateTask(updateTaskDto);
  }
}
