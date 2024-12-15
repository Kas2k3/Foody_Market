import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingList, ShoppingListDocument } from './schemas/shopping.schema';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingList.name) private shoppingListModel: Model<ShoppingListDocument>,
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

    const updatedShoppingList = await this.shoppingListModel.findByIdAndUpdate(
      listId,
      {
        ...(newName && { name: newName }),
        ...(newNote && { note: newNote }),
        ...(newAssignToUsername && { assignedToUserId: newAssignToUsername }),
        ...(newDate && { date: new Date(newDate) }),
      },
      { new: true },
    );

    if (!updatedShoppingList) {
      throw new NotFoundException(`Shopping list with ID ${listId} not found.`);
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
      throw new NotFoundException(`Shopping list with ID ${listId} not found.`);
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
