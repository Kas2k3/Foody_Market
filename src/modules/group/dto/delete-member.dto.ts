import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteMemberDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
