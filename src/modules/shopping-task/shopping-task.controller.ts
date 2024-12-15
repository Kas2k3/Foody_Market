import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
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
  
    // 1. Create tasks
    @Post()
    async createTasks(@Body() createTaskDto: CreateTaskDto) {
      return this.shoppingTaskService.createTasks(createTaskDto);
    }
  
    // 2. Get list of tasks
    @Get()
    async getListOfTasks() {
      return this.shoppingTaskService.getListOfTasks();
    }
  
    // 3. Delete task
    @Delete()
    async deleteTask(@Body() deleteTaskDto: DeleteTaskDto) {
      const { taskId } = deleteTaskDto;
      if (!taskId) {
        throw new BadRequestException('Task ID is required.');
      }
      return this.shoppingTaskService.deleteTask(taskId);
    }
  
    // 4. Update task
    @Put()
    async updateTask(@Body() updateTaskDto: UpdateTaskDto) {
      const { taskId } = updateTaskDto;
      if (!taskId) {
        throw new BadRequestException('Task ID is required.');
      }
      return this.shoppingTaskService.updateTask(updateTaskDto);
    }
  }
  