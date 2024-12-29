import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationGateway,
  ) { }

  @Post('create')
  async createNotification(
    @Body('userId') userId: string,
    @Body('title') title: string,
    @Body('message') message: string,
  ) {
    return this.notificationService.createNotification(userId, title, message);
  }

  @Post('send')
  async sendNotification(@Body() body: { userId: string; message: string }) {
    const { userId, message } = body;

    this.notificationGateway.notifyUser(userId, message);

    return { success: true, message: 'Notification sent successfully!' };
  }
}
