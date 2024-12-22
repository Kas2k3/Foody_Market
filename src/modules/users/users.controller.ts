import { JwtAuthGuard } from './../../auth/passport/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { ObjectId } from 'mongoose';
import { Public } from '@/decorator/customize';
import { RolesGuard } from '@/auth/passport/roles.guard';
import { Roles } from '@/decorator/roles.decorator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.usersService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: ObjectId) {
    return this.usersService.getUserById(id);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id không hợp lệ');
    }
    return this.usersService.remove(id);
  }
}
