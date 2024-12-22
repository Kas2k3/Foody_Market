import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsMongoId({ message: 'Invalid Id' })
  @IsNotEmpty({ message: 'Id cannot be blank' })
  id: string;

  @IsNotEmpty({ message: 'Name cannot be blank' })
  name: string;

  @IsNotEmpty({ message: 'Email cannot be blank' })
  email: string;

  @IsNotEmpty({ message: 'Username cannot be blank' })
  username: string;

  @IsNotEmpty({ message: 'Role cannot be blank' })
  type: string;
}
