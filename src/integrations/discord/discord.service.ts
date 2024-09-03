import { Injectable, Logger } from '@nestjs/common';
import { ofetch } from 'ofetch';
import { OnEvent } from '@nestjs/event-emitter';
import { getConfig } from '../../config/config';
import { MessageEvent } from '../../events/Message';

@Injectable()
export class DiscordService {
  private readonly logger = new Logger('DiscordService');

  @OnEvent(getConfig().integrations.discord.listener.on)
  async handleOrderCreatedEvent(meesage: MessageEvent) {
    const content = `
      From: ${meesage.from} \n
      Message: ${meesage.text}
    `;
    try {
      await ofetch(getConfig().integrations.discord.webhook, {
        method: 'POST',
        body: {
          username: getConfig().integrations.discord.username,
          content,
        },
      });
      this.logger.log('Discord message sent');
    } catch (err) {
      this.logger.error('Discord message not sent');
    }
  }
}
