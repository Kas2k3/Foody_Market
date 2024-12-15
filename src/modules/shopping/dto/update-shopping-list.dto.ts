import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateShoppingListDto {
  @IsString()
  @IsNotEmpty()
  listId: string;

  @IsString()
  @IsOptional()
  newName?: string;

  @IsString()
  @IsOptional()
  newNote?: string;

  @IsString()
  @IsOptional()
  newAssignToUsername?: string;

  @IsString()
  @IsOptional()
  newDate?: string;
}
