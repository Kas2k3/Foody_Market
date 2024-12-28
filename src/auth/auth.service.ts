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
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

export interface IUser {
  email: string;
  id: ObjectId;
  roles: string;
}
@Injectable()
export class AuthService {
  authService: any;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByInfo(email);
    if (!user) return null;

    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) return null;
    return user;
  }

  async login(user: IUser) {
    const accessTokenExpiration = process.env.JWT_ACCESS_TOKEN_EXPIRED;
    const refreshTokenExpiration = process.env.REFRESH_JWT_TOKEN_EXPIRED;

    const payload = { email: user.email, sub: user.id, roles: user.roles };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: accessTokenExpiration,
    });

    const refreshToken = this.generateRefreshToken(user);

    await this.redis.set(
      `refresh_token_${user.id}`,
      refreshToken,
      'EX',
      parseInt(refreshTokenExpiration),
    );

    return {
      resultMessage: {
        en: 'You logged in successfully.',
        vn: 'Bạn đã đăng nhập thành công.',
      },
      resultCode: '00047',
      user,
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string) {
    await this.redis.del(`refresh_token_${userId}`);
    return {
      resultMessage: {
        en: 'You logged out successfully.',
        vn: 'Bạn đã đăng xuất thành công.',
      },
      resultCode: '00048',
    };
  }

  async handleRegister(registerDto: CreateAuthDto) {
    return await this.usersService.handleRegister(registerDto);
  }

  private generateRefreshToken(user: IUser) {
    return this.jwtService.sign(
      { sub: user.id },
      { expiresIn: process.env.REFRESH_JWT_TOKEN_EXPIRED },
    );
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

    let payload;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException({
        resultMessage: {
          en: 'Cannot verify the token, please log in.',
          vn: 'Không thể xác minh token, vui lòng đăng nhập.',
        },
        resultCode: '00063',
      });
    }

    const newAccessToken = this.jwtService.sign(
      { email: payload.email, sub: payload.sub },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED'),
      },
    );

    const newRefreshToken = this.jwtService.sign(
      { email: payload.email, sub: payload.sub },
      {
        secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_JWT_TOKEN_EXPIRED'),
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

  // async logout(userId: string) {
  //   const redisClient = this.redisService.getClient();
  //   await redisClient.del(`auth-token:${userId}`);

  //   return {
  //     resultMessage: {
  //       en: 'Successfully logged out',
  //       vn: 'Đăng xuất thành công',
  //     },
  //     resultCode: '00179',
  //   };
  // }
}
