import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const check_email = await this.userService.findByInfo(email);
    if (!check_email) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Your email has not been activated, please register first.',
          vn: 'Email của bạn chưa được kích hoạt, vui lòng đăng ký trước.',
        },
        resultCode: '00043',
      });
    }

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException({
        resultMessage: {
          en: 'Incorrect Password.',
          vn: 'Mật khẩu không chính xác.',
        },
        resultCode: '00045',
      });
    }
    if (user.isActivated == false) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Your email has not been verified, please verify your email.',
          vn: 'Email của bạn chưa được xác minh, vui lòng xác minh email của bạn.',
        },
        resultCode: '00044',
      });
    }
    return user;
  }
}
