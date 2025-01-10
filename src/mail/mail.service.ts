import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SendMail } from './types/send_mail.';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail-queue') private readonly mailQueue: Queue) {}

  async sendEmail(payload: SendMail) {
    // Thêm công việc vào hàng đợi
    await this.mailQueue.add('send-email', payload, {
      attempts: 3, // Số lần thử lại
      backoff: 5000, // Thời gian giữa các lần thử (ms)
    });
  }
}
