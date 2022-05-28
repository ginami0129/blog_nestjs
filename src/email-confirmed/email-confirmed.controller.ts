import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfirmEmailDto } from './dto/confirmEmail.dto';
import { EmailConfirmedService } from './email-confirmed.service';

@ApiTags('auth')
@Controller('confirm')
export class EmailConfirmedController {
  constructor(private readonly emailConfirmedService: EmailConfirmedService) {}

  @Post()
  async confirm(@Body() confirmData: ConfirmEmailDto) {
    const email = await this.emailConfirmedService.decodeConfirmToken(
      confirmData.token,
    );
    await this.emailConfirmedService.confirmEmail(email);
    return {
      msg: 'success',
    };
  }
}
