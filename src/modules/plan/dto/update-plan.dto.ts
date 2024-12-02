import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  newFoodName?: string;

  @IsOptional()
  @IsString()
  newName?: string;
}
