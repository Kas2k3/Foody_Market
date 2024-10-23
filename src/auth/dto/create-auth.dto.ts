import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Email cannot be blank' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be blank' })
  password: string;

  @IsNotEmpty({ message: 'Name cannot be blank' })
  name: string;

  @IsNotEmpty({ message: 'Username cannot be blank' })
  username: string;
}
