import { Logger, Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import { getConfig } from '../../config/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MessageEvent } from '../../events/Message';

@Injectable()
export class TwilioService {
  client!: Twilio;
  private readonly logger = new Logger(TwilioService.name);
  constructor(private eventEmitter: EventEmitter2) {
    const twilioConfig = getConfig().integrations.twilio;
    this.client = new Twilio(twilioConfig.accountSid, twilioConfig.token);
    this.logger.log('Twilio client integration running');
    this.readMessages();
  }

  async readMessages() {
    this.logger.log('Reading messages');
    try {
    } catch (error) {
      this.logger.error('Error reading messages', error);
    }
    // setTimeout(() => this.readMessages(), 10000);
  }

  // async readMessages() {
  //   this.logger.log('Reading messages');
  //   try {
  //     const messages = await this.client.messages.list({ limit: 5 });
  //     console.log('messages', messages);
  //     messages.forEach((message) => {
  //       this.publishMessage(message.body, message.from);
  //     });
  //   } catch (error) {
  //     this.logger.error('Error reading messages', error);
  //   }
  //   setTimeout(() => this.readMessages(), 10000);
  // }

  publishMessage(message: string, from: string) {
    console.log('publishMessage', message, from);
    this.eventEmitter.emit('message.twilio', new MessageEvent(message, from));
  }
}
