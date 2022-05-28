import { Module } from '@nestjs/common';
import { EmailConfirmedService } from './email-confirmed.service';
import { EmailConfirmedController } from './email-confirmed.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ConfigModule, EmailModule, JwtModule.register({}), UserModule],
  controllers: [EmailConfirmedController],
  providers: [EmailConfirmedService],
  exports: [EmailConfirmedService],
})
export class EmailConfirmedModule {}
