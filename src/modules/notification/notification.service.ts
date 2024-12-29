import {
  FridgeItem,
  FridgeItemDocument,
} from './../fridge/schemas/fridge.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
    @InjectModel(FridgeItem.name)
    private readonly fridgeItemModel: Model<FridgeItemDocument>,
    private readonly notificationGateway: NotificationGateway,
  ) { }

  async createNotification(
    userId: string,
    title: string,
    message: string,
  ): Promise<Notification> {
    const notification = await this.notificationModel.create({
      userId,
      title,
      message,
    });

    this.notificationGateway.sendNotification(userId, {
      title,
      message,
      createdAt: notification.createdAt,
    });

    return notification;
  }

  async checkFridgeItemsExpiration() {
    const now = new Date();
    const oneDayBeforeNow = new Date(now);
    oneDayBeforeNow.setDate(now.getDate() + 1);

    const items = await this.fridgeItemModel
      .find({
        expired: { $lte: now },
      })
      .lean();

    const upcomingItems = await this.fridgeItemModel
      .find({
        expired: { $lte: oneDayBeforeNow, $gt: now },
      })
      .lean();

    for (const item of items) {
      await this.createNotification(
        item.userId.toString(),
        'Food expired',
        `The food item ${item.itemName} has expired.`,
      );
    }

    for (const item of upcomingItems) {
      await this.createNotification(
        item.userId.toString(),
        'Food about to expire',
        `The food item ${item.itemName} will expire tomorrow.`,
      );
    }
  }
}
