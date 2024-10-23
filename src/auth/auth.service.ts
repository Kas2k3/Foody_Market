import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';

export interface IUser {
  email: string;
  _id: ObjectId;
}
@Injectable()
export class AuthService {
  authService: any;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByInfo(email);
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!user || !isValidPassword) return null;
    return user;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user._id };
    return {
      resultMessage: {
        en: 'You logged in successfully.',
        vn: 'Bạn đã đăng nhập thành công.',
      },
      resultCode: '00047',
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async handleRegister(registerDto: CreateAuthDto) {
    return await this.usersService.handleRegister(registerDto);
  }
}
