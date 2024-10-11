import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name cannot be blank' })
  name: string;

  @IsNotEmpty({ message: 'Email cannot be blank' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be blank' })
  password: string;

  @IsOptional()
  language: string;

  @IsOptional()
  timezone: number;

  @IsOptional()
  deviceId: string;
}
