import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'src/config/redis';
import { mailerConfig } from 'src/config/mail';
import { MailQueue } from './mail.queue';
import { MailService } from './mail.service';
@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => config(configService),//config nay la cua redis 
    }),
    BullModule.registerQueue({
      name: 'mail-queue',
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => mailerConfig(configService),
    }),
  ],
  providers: [MailService,MailQueue],
  exports:[MailService]
})
export class MailModule {}
