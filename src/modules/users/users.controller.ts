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
  UseInterceptors,
  UploadedFile,
  Put,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { ObjectId } from 'mongoose';
import { Public } from '@/decorator/customize';
import { RolesGuard } from '@/auth/passport/roles.guard';
import { Roles } from '@/decorator/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UsersController {
  userCloudinaryService: any;
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (request.user.id !== updateUserDto.id) {
      throw new ForbiddenException(
        'You are not authorized to update this user',
      );
    }

    return this.usersService.update(updateUserDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Req() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.user.id; // Lấy userId từ JWT token
    return await this.usersService.changeUserPassword(
      userId,
      changePasswordDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Id không hợp lệ');
    }
    return this.usersService.remove(id);
  }
}
