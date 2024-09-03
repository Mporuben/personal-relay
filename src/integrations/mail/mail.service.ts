import { Injectable, Logger } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';
import { MessageEvent } from '../../events/Message';
import { getConfig } from '../../config/config';

const config = getConfig();
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendMail() {}
  @OnEvent(getConfig().integrations.mail.listener.on)
  handleOrderCreatedEvent(meesage: MessageEvent) {
    const content = `
      From: ${meesage.from} \n
      Message: ${meesage.text}
    `;
    try {
      this.mailerService.sendMail({
        to: config.integrations.mail.listener.sendTo, // list of receivers
        from: config.integrations.mail.user, // sender address
        subject: 'Personal Relay 🔌', // Subject line
        text: content, // plaintext body
        html: content, // HTML body content
      });
      this.logger.log('Email sent');
    } catch (err) {
      this.logger.error('Email sent');
    }
  }
}
