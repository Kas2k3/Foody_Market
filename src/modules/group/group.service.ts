import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
      throw new NotFoundException({
        resultMessage: {
          en: "Admin user not found",
          vn: "Không tìm thấy người tạo nhóm",
        },
        resultCode: "00103",
      });
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
      throw new NotFoundException({
        resultMessage: {
          en: 'Group not found.',
          vn: 'Không tìm thấy nhóm nào.',
        },
        resultCode: '00099',
      });
    }

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException({
        resultMessage: {
          en: 'This user does not exist.',
          vn: 'Không tồn tại user này.',
        },
        resultCode: '00099x',
      });
    }

    if (group.members.includes(user._id)) {
      throw new BadRequestException({
        resultMessage: {
          en: 'This user is already in group.',
          vn: 'Người này đã ở trong nhóm.',
        },
        resultCode: '00105',
      });
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
      throw new NotFoundException({
        resultMessage: {
          en: 'Group not found.',
          vn: 'Không tìm thấy nhóm nào.',
        },
        resultCode: '00099',
      });
    }

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException({
        resultMessage: {
          en: 'This user does not exist.',
          vn: 'Không tồn tại user này.',
        },
        resultCode: '00099x',
      });
    }

    const memberIndex = group.members.indexOf(user._id);
    if (memberIndex === -1) {
      throw new BadRequestException({
        resultMessage: {
          en: 'This user is not a member in group.',
          vn: 'Người này không phải thành viên nhóm.',
        },
        resultCode: '00105x',
      });
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
      throw new NotFoundException({
        resultMessage: {
          en: 'Group not found.',
          vn: 'Không tìm thấy nhóm nào.',
        },
        resultCode: '00099',
      });
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

  // 5. Get groups by userId
  async getGroupsByUserId(userId: string) {
    // Kiểm tra tính hợp lệ của userId
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Invalid UserId.',
          vn: 'UserId không hợp lệ.',
        },
        resultCode: '00101',
      });
    }
    const objectId = new Types.ObjectId(userId);
  
    // Tìm các nhóm mà userId thuộc về
    const groups = await this.groupModel
      .find({ members: objectId })
      .populate('groupAdmin', '-password') // Lấy thông tin admin và loại bỏ trường password
      .populate('members', '-password');  // Lấy thông tin member ban đầu
  
    if (!groups.length) {
      throw new NotFoundException({
        resultMessage: {
          en: 'You are not part of any group.',
          vn: 'Bạn không thuộc về nhóm nào.',
        },
        resultCode: '00096',
      });
    }
  
    // Lấy đầy đủ thông tin của các thành viên trong mỗi nhóm
    const enrichedGroups = await Promise.all(
      groups.map(async (group) => {
        const members = await Promise.all(
          group.members.map(async (memberId) => {
            const member = await this.userModel
              .findById(memberId)
              .select('-password'); // Lấy thông tin và loại bỏ password
            return member;
          })
        );
  
        return {
          ...group.toObject(),
          members,
        };
      })
    );
  
    return {
      resultMessage: {
        en: 'Groups retrieved successfully',
        vn: 'Lấy nhóm thành công',
      },
      resultCode: '00109',
      groups: enrichedGroups,
    };
  }  
}
