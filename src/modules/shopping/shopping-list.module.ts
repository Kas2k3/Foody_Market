import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingList, ShoppingListSchema } from './schemas/shopping.schema';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UserCloudinaryService } from '../cloudinary/user/user.cloudinary';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingList.name, schema: ShoppingListSchema },
    ]),
    UsersModule,
  ],
  controllers: [ShoppingListController],
  providers: [ShoppingListService, UsersService, UserCloudinaryService],
})
export class ShoppingListModule { }
