import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteShoppingListDto {
  @IsString()
  @IsNotEmpty()
  listId: string;
}
