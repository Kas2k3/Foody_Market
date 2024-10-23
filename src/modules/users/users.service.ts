import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPasswordHelper } from '@/helpers/util';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import app from 'api-query-params';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  isInfoExist = async (info: string) => {
    const user = await this.userModel.exists({
      $or: [{ email: info }, { username: info }],
    });
    if (user) return true;
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const { username, name, email, password, language, timezone, deviceId } =
      createUserDto;

    //check input
    if (!username || !name || !email || !password) {
      return {
        resultMessage: {
          en: 'Please provide all required fields!',
          vn: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
        },
        resultCode: '00038',
      };
    }
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
    const user = await this.userModel.create({
      name,
      email,
      username,
      password: hashedPassword,
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

  //update name
  async update(updateUserDto: UpdateUserDto) {
    const { _id, name } = updateUserDto;
    //check input
    if (!name || !_id) {
      return {
        resultMessage: {
          en: 'Please provide all required fields!',
          vn: 'Vui lòng cung cấp tất cả các trường bắt buộc!',
        },
        resultCode: '00038',
      };
    }
    if (name.length < 4 || name.length > 30) {
      return {
        resultMessage: {
          en: 'Please provide a name longer than 3 characters and shorter than 30 characters.',
          vn: 'Vui lòng cung cấp một tên dài hơn 3 ký tự và ngắn hơn 30 ký tự.',
        },
        resultCode: '00028',
      };
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
    const user = await this.userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
      isActivated: false,
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'minutes'),
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
}
