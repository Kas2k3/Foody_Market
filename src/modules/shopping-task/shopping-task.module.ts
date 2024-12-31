import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingTaskController } from './shopping-task.controller';
import { ShoppingTaskService } from './shopping-task.service';
import { ShoppingTask, ShoppingTaskSchema } from './schemas/shopping-task.schema';
import { ShoppingList, ShoppingListSchema } from '../shopping/schemas/shopping.schema';
import { ShoppingListService } from '../shopping/shopping-list.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ShoppingTask.name, schema: ShoppingTaskSchema }]),
    MongooseModule.forFeature([{ name: ShoppingList.name, schema: ShoppingListSchema }]),
    UsersModule,
  ],
  controllers: [ShoppingTaskController],
  providers: [ShoppingTaskService, ShoppingListService],
})
export class ShoppingTaskModule {}
