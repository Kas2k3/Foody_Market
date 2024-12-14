import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  foodName: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  htmlContent: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
