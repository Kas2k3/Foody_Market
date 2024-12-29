import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { DeleteMemberDto } from './dto/delete-member.dto';

@Controller('user/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // 1. Tạo nhóm
  @Post()
  @UseGuards(JwtAuthGuard)
  async createGroup(@Body() createGroupDto: CreateGroupDto, @Request() req: any) {
    const userId = req.user.id; // Lấy ID của người dùng từ JWT
    return this.groupService.createGroup(createGroupDto, userId);
  }

  // 2. Thêm thành viên
  @Post('/add/:groupId')
  @UseGuards(JwtAuthGuard)
  async addMember(@Param('groupId') groupId: string, @Body() addMemberDto: AddMemberDto) {
    return this.groupService.addMember(groupId, addMemberDto.username);
  }

  // 3. Xóa thành viên
  @Delete(':groupId')
  @UseGuards(JwtAuthGuard)
  async deleteMember(@Param('groupId') groupId: string, @Body() deleteMemberDto: DeleteMemberDto) {
    return this.groupService.deleteMember(groupId, deleteMemberDto.username);
  }

  // 4. Lấy danh sách thành viên
  @Get(':groupId')
  @UseGuards(JwtAuthGuard)
  async getGroupMembers(@Param('groupId') groupId: string) {
    return this.groupService.getGroupMembers(groupId);
  }

  // 5. Get groups by userId
  @Get('users/:userId')
  @UseGuards(JwtAuthGuard)
  async getGroupsByUserId(@Param('userId') userId: string) {
    return this.groupService.getGroupsByUserId(userId);
  }
}
