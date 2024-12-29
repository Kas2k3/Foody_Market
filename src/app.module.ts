import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UsersModule } from '@/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { FoodModule } from '@/modules/food/food.module';
import { PlanModule } from '@/modules/plan/plan.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { ShoppingTaskModule } from './modules/shopping-task/shopping-task.module';
import { ShoppingListModule } from './modules/shopping/shopping-list.module';
import { FridgeItemModule } from '@/modules/fridge/fridge.module';
import { MulterModule } from '@nestjs/platform-express';
import { GroupModule } from '@/modules/group/group.module';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';
// import { NotificationModule } from './modules/notification/notification.module';
// import { CategoryModule } from '@/modules/category/category.module';
// import { UnitModule } from '@/modules/unit/unit.module';

@Module({
  imports: [
    UsersModule,
    RedisModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT');
        return {
          type: 'single',
          options: {
            host: redisHost,
            port: redisPort,
          },
        } as RedisModuleOptions;
      },
      inject: [ConfigService],
    }),
    AuthModule,
    FoodModule,
    PlanModule,
    RecipeModule,
    ShoppingTaskModule,
    ShoppingListModule,
    FridgeItemModule,
    GroupModule,
    // NotificationModule,
    // CategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [
        ConfigModule,
        MulterModule.register({
          dest: './uploads',
        }),
      ],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: true,
          // ignoreTLS: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
