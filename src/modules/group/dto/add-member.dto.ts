import { IsNotEmpty, IsString } from 'class-validator';

export class AddMemberDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
