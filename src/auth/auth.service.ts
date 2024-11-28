import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import {
  ChangePasswordAuthDto,
  CodeAuthDto,
  CreateAuthDto,
} from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';

export interface IUser {
  email: string;
  _id: ObjectId;
  roles: string;
}
@Injectable()
export class AuthService {
  authService: any;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByInfo(email);
    if (!user) return null;

    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) return null;
    return user;
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user._id, roles: user.roles };
    return {
      resultMessage: {
        en: 'You logged in successfully.',
        vn: 'Bạn đã đăng nhập thành công.',
      },
      resultCode: '00047',
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  async handleRegister(registerDto: CreateAuthDto) {
    return await this.usersService.handleRegister(registerDto);
  }

  private generateRefreshToken(user: IUser) {
    const payload = { email: user.email, sub: user._id, roles: user.roles };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>(
        'REFRESH_JWT_ACCESS_TOKEN_EXPIRED',
      ),
    });
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({
        resultMessage: {
          en: 'Please provide a refresh token.',
          vn: 'Vui lòng cung cấp token làm mới.',
        },
        resultCode: '00059',
      });
    }

    const payload = this.jwtService.verify(refreshToken);
    if (!payload) {
      throw new UnauthorizedException({
        resultMessage: {
          en: 'Cannot verify the token, please log in.',
          vn: 'Không thể xác minh token, vui lòng đăng nhập.',
        },
        resultCode: '00063',
      });
    }

    const newAccessToken = this.jwtService.sign({
      email: payload.email,
      sub: payload.sub,
    });

    const newRefreshToken = this.jwtService.sign(
      {
        email: payload.email,
        sub: payload.sub,
      },
      {
        expiresIn: this.configService.get<string>(
          'REFRESH_JWT_ACCESS_TOKEN_EXPIRED',
        ),
      },
    );

    return {
      resultMessage: {
        en: 'The token has been successfully refreshed.',
        vn: 'Token đã được làm mới thành công.',
      },
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async verifyEmail(codeAuthDto: CodeAuthDto) {
    return await this.usersService.handleActive(codeAuthDto);
  }

  async resendEmail(data: string) {
    return await this.usersService.resendActive(data);
  }

  async forgotPassword(data: string) {
    return await this.usersService.forgotPassword(data);
  }

  async changePassword(data: ChangePasswordAuthDto) {
    return await this.usersService.changePassword(data);
  }
}
