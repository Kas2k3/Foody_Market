import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingList, ShoppingListDocument } from './schemas/shopping.schema';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingList.name)
    private shoppingListModel: Model<ShoppingListDocument>,
    private readonly userService: UsersService,
  ) {}

  // 1. Create a new shopping list
  async createShoppingList(createDto: CreateShoppingListDto & { userId: string; assignedToUserId: string }) {
    const { name, note, date, userId, assignedToUserId } = createDto;

    const createdShoppingList = new this.shoppingListModel({
      name,
      note: note || '',
      date: new Date(date),
      userId,
      assignedToUserId,
      belongsToGroupAdminId: userId,
    });

    await createdShoppingList.save();

    return {
      resultMessage: {
        en: 'Shopping list created successfully.',
        vn: 'Danh sách mua sắm đã được tạo thành công.'
      },
      resultCode: '00249',
      createdShoppingList: createdShoppingList,
    };
  }

  // 2. Update an existing shopping list
  async updateShoppingList(updateDto: UpdateShoppingListDto) {
    const { listId, newName, newNote, newAssignToUsername, newDate } = updateDto;

    let newAssignToUserId = null;

    // Tìm userId từ username nếu newAssignToUsername tồn tại
    if (newAssignToUsername) {
      const user = await this.userService.findByUsername(newAssignToUsername);
      if (!user) {
        throw new NotFoundException({
          resultMessage: {
            en: 'Assigned user not found.',
            vn: 'Không tìm thấy người dùng được chỉ định.',
          },
          resultCode: '00261',
        });
      }
      newAssignToUserId = user.id; // Lấy userId
    }

    const updatedShoppingList = await this.shoppingListModel.findByIdAndUpdate(
      listId,
      {
        ...(newName && { name: newName }),
        ...(newNote && { note: newNote }),
        ...(newAssignToUserId && { assignedToUserId: newAssignToUserId }),
        ...(newDate && { date: new Date(newDate) }),
      },
      { new: true },
    );

    if (!updatedShoppingList) {
      throw new NotFoundException({
        resultMessage: {
          en: 'Shopping list not found.',
          vn: 'Không tìm thấy danh sách mua sắm.',
        },
        resultCode: '00260',
      });
    }

    return {
      resultMessage: {
        en: 'Shopping list updated successfully',
        vn: 'Cập nhật danh sách mua sắm thành công',
      },
      resultCode: '00266',
      newShoppingList: updatedShoppingList,
    };
  }


  // 3. Delete a shopping list
  async deleteShoppingList(listId: string) {
    const result = await this.shoppingListModel.findByIdAndDelete(listId);

    if (!result) {
      throw new NotFoundException({
        resultMessage: {
          en: 'Shopping list not found.',
          vn: 'Không tìm thấy danh sách mua sắm.',
        },
        resultCode: '00272',
      });
    }

    return { 
      resultMessage: {
        en: 'Shopping list deleted successfully',
        vn: 'Danh sách mua sắm đã được xóa thành công',
      },
      resultCode: '00275',
    };
  }
}
