import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsMongoId({ message: 'Invalid Id' })
  @IsNotEmpty({ message: 'Id cannot be blank' })
  _id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  language: string;
}
