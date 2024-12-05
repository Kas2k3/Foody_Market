import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPasswordHelper } from '@/helpers/util';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from './schemas/user.schema';
import app from 'api-query-params';
import {
  ChangePasswordAuthDto,
  CodeAuthDto,
  CreateAuthDto,
} from '@/auth/dto/create-auth.dto';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

export function randomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  isInfoExist = async (info: string) => {
    const user = await this.userModel.exists({
      $or: [{ email: info }, { username: info }],
    });
    if (user) return true;
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const {
      username,
      name,
      email,
      password,
      type,
      language,
      timezone,
      deviceId,
    } = createUserDto;

    //check input
    if (!username || !name || !email || !password || !type) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide all required fields!',
          vn: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
        },
        resultCode: '00038',
      });
    }
    if (name.length < 4 || name.length > 30) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide a name longer than 3 characters and shorter than 30 characters.',
          vn: 'Vui lòng cung cấp một tên dài hơn 3 ký tự và ngắn hơn 30 ký tự.',
        },
        resultCode: '00028',
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide a valid email address!',
          vn: 'Vui lòng cung cấp một địa chỉ email hợp lệ!',
        },
        resultCode: '00026',
      });
    }
    if (password.length < 7 || password.length > 20) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide a password longer than 6 characters and shorter than 20 characters.',
          vn: 'Vui lòng cung cấp mật khẩu dài hơn 6 ký tự và ngắn hơn 20 ký tự.',
        },
        resultCode: '00027',
      });
    }

    //check exist
    const isEmailExist = await this.isInfoExist(email);
    if (isEmailExist) {
      throw new BadRequestException({
        resultMessage: {
          en: 'An account with this email address already exists.',
          vn: 'Một tài khoản với địa chỉ email này đã tồn tại.',
        },
        resultCode: '00032',
      });
    }
    const isUsernameExist = await this.isInfoExist(username);
    if (isUsernameExist) {
      throw new BadRequestException({
        resultMessage: {
          en: 'An account with this username already exists.',
          vn: 'Một tài khoản với tên người dùng này đã tồn tại.',
        },
        resultCode: '00032x',
      });
    }

    //hash password
    const hashedPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name,
      email,
      username,
      password: hashedPassword,
      type,
      language,
      timezone,
      deviceId,
    });

    return {
      resultMessage: {
        en: 'You have successfully registered.',
        vn: 'Bạn đã đăng ký thành công.',
      },
      resultCode: '00035',
      id: user.id,
      user,
      confirmToken: 'your_confirmation_token',
    };
  }

  //get all user
  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = app(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any);

    return {
      results,
      totalPages,
    };
  }

  //get user by id
  findOne(id: number) {
    return `This action returns a ${id} user`;
  }

  //search user by email or username
  async findByInfo(info: string): Promise<User | null> {
    return await this.userModel.findOne({
      $or: [{ email: info }, { username: info }],
    });
  }

  //find by id
  async findById(userId: ObjectId) {
    return this.userModel.findById(userId);
  }

  //save refresh token
  async saveRefreshToken(userId: ObjectId, refreshToken: string) {
    await this.userModel.updateOne({ _id: userId }, { refreshToken });
  }

  //update
  async update(updateUserDto: UpdateUserDto) {
    const { _id, email, name, username, type } = updateUserDto;
    //check input
    if (!email || !name || !_id || !username || !type) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide all required fields!',
          vn: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
        },
        resultCode: '00038',
      });
    }
    if (name.length < 4 || name.length > 30) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide a name longer than 3 characters and shorter than 30 characters.',
          vn: 'Vui lòng cung cấp một tên dài hơn 3 ký tự và ngắn hơn 30 ký tự.',
        },
        resultCode: '00028',
      });
    }

    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  //delete account
  async remove(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    await this.userModel.deleteOne({ _id: id });
    return {
      resultMessage: {
        en: 'This account was deleted successfully.',
        vn: 'Tài khoản này đã được xóa thành công.',
      },
      resultCode: '00092',
      id,
    };
  }

  //register
  async handleRegister(registerDto: CreateAuthDto) {
    const { name, username, email, password } = registerDto;

    //check input
    if (name.length < 4 || name.length > 30) {
      return {
        resultMessage: {
          en: 'Please provide a name longer than 3 characters and shorter than 30 characters.',
          vn: 'Vui lòng cung cấp một tên dài hơn 3 ký tự và ngắn hơn 30 ký tự.',
        },
        resultCode: '00028',
      };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        resultMessage: {
          en: 'Please provide a valid email address!',
          vn: 'Vui lòng cung cấp một địa chỉ email hợp lệ!',
        },
        resultCode: '00026',
      };
    }
    if (password.length < 7 || password.length > 20) {
      return {
        resultMessage: {
          en: 'Please provide a password longer than 6 characters and shorter than 20 characters.',
          vn: 'Vui lòng cung cấp mật khẩu dài hơn 6 ký tự và ngắn hơn 20 ký tự.',
        },
        resultCode: '00027',
      };
    }

    //check exist
    const isEmailExist = await this.isInfoExist(email);
    if (isEmailExist) {
      return {
        resultMessage: {
          en: 'An account with this email address already exists.',
          vn: 'Một tài khoản với địa chỉ email này đã tồn tại.',
        },
        resultCode: '00032',
      };
    }
    const isUsernameExist = await this.isInfoExist(username);
    if (isUsernameExist) {
      return {
        resultMessage: {
          en: 'An account with this username already exists.',
          vn: 'Một tài khoản với tên người dùng này đã tồn tại.',
        },
        resultCode: '00032x',
      };
    }

    //hash password
    const hashedPassword = await hashPasswordHelper(password);
    const codeId = randomCode();
    const user = await this.userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
      isActivated: false,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes'),
    });

    //send email
    this.mailerService.sendMail({
      to: user.email,
      subject: 'Activation your account for FoodyMart',
      template: 'verify.hbs',
      context: {
        name: user?.name ?? user.username,
        activationCode: codeId,
      },
    });

    return {
      resultMessage: {
        en: 'You have successfully registered.',
        vn: 'Bạn đã đăng ký thành công.',
      },
      resultCode: '00035',
      _id: user._id,
      user,
      confirmToken: 'your_confirmation_token',
    };
  }

  //activate
  async handleActive(data: CodeAuthDto) {
    const user = await this.userModel.findOne({
      _id: data._id,
      codeId: data.code,
    });
    if (!user) {
      throw new BadRequestException({
        resultMessage: {
          en: 'The code you entered does not match the code we sent to your email. Please check again.',
          vn: 'Mã bạn nhập không khớp với mã chúng tôi đã gửi đến email của bạn. Vui lòng kiểm tra lại.',
        },
        resultCode: '00054',
      });
    }

    // check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    if (isBeforeCheck) {
      await this.userModel.updateOne(
        { _id: data._id },
        {
          isActivated: true,
        },
      );
      return {
        resultMessage: {
          en: 'Your email address has been successfully verified.',
          vn: 'Địa chỉ email của bạn đã được xác minh thành công.',
        },
        resultCode: '00058',
      };
    } else {
      throw new BadRequestException({
        resultMessage: {
          en: 'The code you entered does not match the code we sent to your email or has expired. Please check again.',
          vn: 'Mã bạn nhập không khớp với mã chúng tôi đã gửi đến email của bạn hoặc đã bị hết hạn. Vui lòng kiểm tra lại.',
        },
        resultCode: '00054x',
      });
    }
  }

  //resend activate
  async resendActive(email: string) {
    //check email
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Cannot find the user.',
          vn: 'Không thể tìm thấy người dùng.',
        },
        resultCode: '00052',
      });
    }
    if (user.isActivated) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Your email address has been previously verified.',
          vn: 'Địa chỉ email của bạn đã được xác minh trước đó.',
        },
        resultCode: '00058x',
      });
    }

    //update user
    const codeId = randomCode();
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes'),
    });

    //send email
    this.mailerService.sendMail({
      to: user.email,
      subject: 'Activation your account for FoodyMart',
      template: 'register.hbs',
      context: {
        name: user?.name ?? user.username,
        activationCode: codeId,
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

  //forgot password
  async forgotPassword(email: string) {
    //check email
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Cannot find the user.',
          vn: 'Không thể tìm thấy người dùng.',
        },
        resultCode: '00052',
      });
    }

    //update user
    const codeId = randomCode();
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes'),
    });

    //send code
    this.mailerService.sendMail({
      to: user.email,
      subject: 'Change password for FoodyMart Account',
      template: 'verify.hbs',
      context: {
        name: user?.name ?? user.username,
        activationCode: codeId,
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

  //change forgot password
  async changePassword(data: ChangePasswordAuthDto) {
    if (data.confirmPassword !== data.password) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please enter the new password and confirm the new password is the same.',
          vn: 'Vui lòng nhập mật khẩu mới và xác nhận mật khẩu mới giống nhau.',
        },
        resultCode: '00072x',
      });
    }

    //check email
    const user = await this.userModel.findOne({ email: data.email });

    if (!user) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Cannot find the user.',
          vn: 'Không thể tìm thấy người dùng.',
        },
        resultCode: '00052',
      });
    }

    //check password
    if (data.password.length < 7 || data.password.length > 20) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Please provide a password longer than 6 characters and shorter than 20 characters.',
          vn: 'Vui lòng cung cấp mật khẩu dài hơn 6 ký tự và ngắn hơn 20 ký tự.',
        },
        resultCode: '00027',
      });
    }

    // check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    if (isBeforeCheck) {
      const newPassword = await hashPasswordHelper(data.password);
      await user.updateOne({ password: newPassword });
      return {
        resultMessage: {
          en: 'Your password has been successfully changed.',
          vn: 'Mật khẩu của bạn đã được thay đổi thành công.',
        },
        resultCode: '00076',
      };
    } else {
      throw new BadRequestException({
        resultMessage: {
          en: 'The code you entered does not match the code we sent to your email or has expired. Please check again.',
          vn: 'Mã bạn nhập không khớp với mã chúng tôi đã gửi đến email của bạn hoặc đã bị hết hạn. Vui lòng kiểm tra lại.',
        },
        resultCode: '00054x',
      });
    }
  }
}
