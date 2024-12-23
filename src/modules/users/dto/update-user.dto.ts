import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsMongoId({ message: 'Invalid Id' })
  @IsNotEmpty({ message: 'Id cannot be blank' })
  id: string;

  @IsNotEmpty({ message: 'Name cannot be blank' })
  name: string;

  @IsOptional()
  email: string;

  @IsNotEmpty({ message: 'Username cannot be blank' })
  username: string;

  @IsOptional()
  type: string;

  @IsOptional()
  avatar: string;
}
