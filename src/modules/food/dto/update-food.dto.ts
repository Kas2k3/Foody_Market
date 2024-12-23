import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { CategoryEnum, UnitEnum } from '../schemas/food.schema';

export class UpdateFoodDto {
  // @IsMongoId({ message: 'Invalid Id' })
  // @IsNotEmpty({ message: 'Id cannot be blank' })
  // id: string;

  @IsNotEmpty({ message: 'Name cannot be blank' })
  name: string;

  @IsOptional()
  imageUrl?: string;

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
