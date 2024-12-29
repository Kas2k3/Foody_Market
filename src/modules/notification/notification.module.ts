import { ScheduleModule } from '@nestjs/schedule';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { SchedulerService } from '../fridge/expiration-check.service';
import { FridgeItem, FridgeItemSchema } from '../fridge/schemas/fridge.schema';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: FridgeItem.name, schema: FridgeItemSchema },
    ]),
    ScheduleModule,
  ],
  providers: [NotificationService, NotificationGateway, SchedulerService],
  controllers: [NotificationController],
})
export class NotificationModule { }
