import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';
import {
  ChangePasswordAuthDto,
  CodeAuthDto,
  CreateAuthDto,
} from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    // return req.user;
  }

  @Post('refresh-token')
  @Public()
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Post('verify-email')
  @Public()
  verifyEmail(@Body() codeAuthDto: CodeAuthDto) {
    return this.authService.verifyEmail(codeAuthDto);
  }

  @Post('resend-verification-code')
  @Public()
  resendEmail(@Body('email') email: string) {
    return this.authService.resendEmail(email);
  }

  @Post('forgot-password')
  @Public()
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('change-forgot-password')
  @Public()
  changePassword(@Body() data: ChangePasswordAuthDto) {
    return this.authService.changePassword(data);
  }

  @Get('send-verification-code')
  @Public()
  sendEmail() {
    this.mailerService.sendMail({
      to: 'kas@gmail.com',
      subject: 'FoodyMart Activation',
      template: 'verify.hbs',
      context: {
        name: 'Kas',
        activationCode: 123456,
      },
    });

    return {
      resultMessage: {
        en: 'The code has been successfully sent to your email.',
        vn: 'Mã đã được gửi đến email của bạn thành công.',
      },
      resultCode: '00048',
    };
  }
}
