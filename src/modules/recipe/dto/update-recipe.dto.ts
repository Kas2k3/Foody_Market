import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRecipeDto {
  @IsString()
  @IsNotEmpty()
  recipeId: string;

  @IsString()
  @IsOptional()
  newHtmlContent?: string;

  @IsString()
  @IsOptional()
  newDescription?: string;

  @IsString()
  @IsOptional()
  newFoodName?: string;

  @IsString()
  @IsOptional()
  newName?: string;
}
