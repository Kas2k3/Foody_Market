import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  foodName: string;

  @IsNotEmpty()
  @IsDateString()
  timestamp: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
