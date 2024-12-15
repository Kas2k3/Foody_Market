import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  foodName: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  listId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks: TaskDto[];
}

export class DeleteTaskDto {
  @IsString()
  @IsNotEmpty()
  taskId: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsString()
  @IsNotEmpty()
  newFoodName: string;
}
