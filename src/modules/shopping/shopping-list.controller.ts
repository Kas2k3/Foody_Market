import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { UsersService } from '@/modules/users/users.service';
import { CreateShoppingListDto } from './dto/create-shopping-list.dto';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { DeleteShoppingListDto } from './dto/delete-shopping-list.dto';

@Controller('shopping')
@UseGuards(JwtAuthGuard)
export class ShoppingListController {
  constructor(
    private readonly shoppingListService: ShoppingListService,
    private readonly usersService: UsersService,
  ) { }

  // 1. Create a shopping list
  @Post()
  async createShoppingList(
    @Body() createDto: CreateShoppingListDto,
    @Request() req,
  ) {
    const userId = req.user.id; // Extract `userId` from JWT payload

    // Find assigned user by username
    const assignedUser = await this.usersService.findByUsername(createDto.assignToUsername);
    if (!assignedUser) {
      throw new BadRequestException('Assigned user does not exist.');
    }

    // Create a new shopping list
    return this.shoppingListService.createShoppingList({
      ...createDto,
      userId,
      assignedToUserId: assignedUser.id.toString(),
    });
  }

  // 2. Update a shopping list
  @Put()
  async updateShoppingList(@Body() updateDto: UpdateShoppingListDto) {
    if (!updateDto.listId) {
      throw new BadRequestException('List ID is required.');
    }
    return this.shoppingListService.updateShoppingList(updateDto);
  }

  // 3. Delete a shopping list
  @Delete()
  async deleteShoppingList(@Body() deleteDto: DeleteShoppingListDto) {
    const { listId } = deleteDto;
    if (!listId) {
      throw new BadRequestException('List ID is required.');
    }
    return this.shoppingListService.deleteShoppingList(listId);
  }
}
