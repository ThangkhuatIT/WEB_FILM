import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('mail-queue')
export class MailQueue {
  constructor(private readonly mailerService: MailerService) {}

  @Process('send-email')
  async handleSendEmail(job: Job) {
    const { to, subject, template, context } = job.data;
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context,
      });
      console.log(`Email sent successfully to ${to} ${template}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
    }
  }
}
