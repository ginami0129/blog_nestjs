import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';
import { ConfirmEmailDto } from './dto/confirmEmail.dto';
import { EmailConfirmedService } from './email-confirmed.service';
import { Response } from 'express';

@ApiTags('auth')
@Controller('confirm')
@UseInterceptors(ClassSerializerInterceptor)
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

  @Post('resend')
  @UseGuards(JwtAuthGuard)
  async resendConfirmEmailLink(@Req() req: RequestWithUser) {
    console.log(req.user.id);
    await this.emailConfirmedService.resendEmailConfirmLink(req.user.id);
  }
}
