import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { CategoryEnum, UnitEnum } from '../schemas/food.schema';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsEnum(CategoryEnum, { message: 'Invalid category value' })
  category: CategoryEnum;

  @IsNotEmpty()
  @IsEnum(UnitEnum, { message: 'Invalid unit value' })
  unit: UnitEnum;

  @IsOptional()
  @IsString()
  userIdCreate?: string;
}
