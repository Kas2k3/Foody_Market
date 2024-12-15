import { IsString, IsNotEmpty } from 'class-validator';

export class CreateShoppingListDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  note?: string;

  @IsString()
  @IsNotEmpty()
  assignToUsername: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}
