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

export class CodeAuthDto {
  @IsNotEmpty({ message: 'Id cannot be blank' })
  _id: string;

  @IsNotEmpty({ message: 'Code cannot be blank' })
  code: string;
}

export class ChangePasswordAuthDto {
  @IsNotEmpty({ message: 'Email cannot be blank' })
  email: string;

  @IsNotEmpty({ message: 'Code cannot be blank' })
  code: string;

  @IsNotEmpty({ message: 'Password cannot be blank' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password cannot be blank' })
  confirmPassword: string;
}
