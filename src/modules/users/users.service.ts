import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPasswordHelper, comparePasswordHelper } from '@/helpers/util';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import app from 'api-query-params';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  };

  //login
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.findByEmail(email);
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = { id: user._id, email: user.email };
    return {
      resultMessage: {
        en: 'You logged in successfully.',
        vn: 'Bạn đã đăng nhập thành công.',
      },
      resultCode: '00047',
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  //register
  async create(createUserDto: CreateUserDto) {
    const { name, email, password, language, timezone, deviceId } =
      createUserDto;

    //check input
    if (!name || !email || !password) {
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
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      return {
        resultMessage: {
          en: 'An account with this email address already exists.',
          vn: 'Một tài khoản với địa chỉ email này đã tồn tại.',
        },
        resultCode: '00032',
      };
    }

    //hash password
    const hashedPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name,
      email,
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
    return `This action returns a #${id} user`;
  }

  //search user by email
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  //edit in4
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
        en: 'Your account was deleted successfully.',
        vn: 'Tài khoản của bạn đã được xóa thành công.',
      },
      resultCode: '00092',
      id,
    };
  }
}
