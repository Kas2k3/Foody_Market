import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from './schemas/group.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<GroupDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // 1. Create Group
  async createGroup(createGroupDto: CreateGroupDto, adminId: string) {
    const admin = await this.userModel.findById(adminId);
    if (!admin) {
      throw new NotFoundException('Admin user not found');
    }

    const newGroup = new this.groupModel({
      name: createGroupDto.name,
      groupAdmin: admin._id,
      members: [admin._id],
    });

    await newGroup.save();
    return {
      resultMessage: {
        en: "Your group has been created successfully",
        vn: "Tạo nhóm thành công",
      },
      resultCode: "00095",
      id: newGroup._id,
      name: newGroup.name,
      adminId: newGroup.groupAdmin,
    };
  }

  // 2. Add Member
  async addMember(groupId: string, username: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (group.members.includes(user._id)) {
      throw new BadRequestException('User is already a member of the group');
    }

    group.members.push(user._id);
    await group.save();

    return {
      resultMessage: {
        en: "User added to the group successfully",
        vn: "Người dùng thêm vào nhóm thành công",
      },
      resultCode: "00102",
    };
  }

  // 3. Delete Member
  async deleteMember(groupId: string, username: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const memberIndex = group.members.indexOf(user._id);
    if (memberIndex === -1) {
      throw new BadRequestException('User is not a member of the group');
    }

    group.members.splice(memberIndex, 1);
    await group.save();

    return {
      resultMessage: {
        en: "User removed from the group successfully",
        vn: "Xóa thành công",
      },
      resultCode: "00106",
    };
  }

  // 4. Get Group Members
  async getGroupMembers(groupId: string) {
    const group = await this.groupModel
      .findById(groupId)
      .populate('groupAdmin', '-password')
      .populate('members', '-password'); // Exclude sensitive fields like password

    if (!group) {
      throw new NotFoundException('Group not found');
    }
    const members = await Promise.all(
        group.members.map(async (memberId) => {
          const member = await this.userModel
            .findById(memberId)
            .select('-password');
          return member;
        })
    );

    return {
      resultMessage: {
        en: 'Successfully',
        vn: 'Thành công',
      },
      groupAdmin: group.groupAdmin._id,
      members: members,
      resultCode: '00098',
    };
  }
}
