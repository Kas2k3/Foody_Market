import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class SchedulerService {
  constructor(private readonly notificationService: NotificationService) { }

  // Cron job chạy mỗi ngày vào lúc 00:00
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleExpiredItems() {
    console.log('Checking for expired or expiring items...');
    await this.notificationService.checkFridgeItemsExpiration();  // Kiểm tra thực phẩm hết hạn
  }
}
