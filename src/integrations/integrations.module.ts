import { Module } from '@nestjs/common';
import { TwilioModule } from './twilio/twilio.module';
import { MailModule } from './mail/mail.module';
import { DiscordModule } from './discord/discord.module';

@Module({
  imports: [TwilioModule, MailModule, DiscordModule],
})
export class IntegrationsModule {}
