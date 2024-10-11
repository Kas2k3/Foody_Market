import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPasswordHelper } from '@/helpers/util';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import app from 'api-query-params';
import { ResponseCodeStore } from '@/response';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, language, timezone, deviceId } =
      createUserDto;

    //check language
    const lang = language === 'en' || language === 'vn' ? language : 'vn';

    //check input
    if (!name || !email || !password) {
      throw new BadRequestException(
        ResponseCodeStore.getMessage['00038'],
        language,
      );
    }
    if (name.length < 4 || name.length > 30) {
      throw new BadRequestException(
        ResponseCodeStore.getMessage('00028', lang),
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException(
        ResponseCodeStore.getMessage('00026', lang),
      );
    }
    if (password.length < 7 || password.length > 20) {
      throw new BadRequestException(
        ResponseCodeStore.getMessage('00027', lang),
      );
    }
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        ResponseCodeStore.getMessage('00032', lang),
      );
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
      message: ResponseCodeStore.getMessage('00035', lang),
      id: user.id,
      user,
      confirmToken: 'your_confirmation_token',
    };
  }

  async findAll(query: string, current: number, pageSize: number) {

    //check language
    // const lang = query.language === 'en' || query.language === 'vn' ? query.language : 'vn';
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
      // message: ResponseCodeStore.getMessage('00035', lang),
      results,
      totalPages,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
