import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailConfirmedService } from './email-confirmed.service';

@Controller('email-confirmed')
export class EmailConfirmedController {
  constructor(private readonly emailConfirmedService: EmailConfirmedService) {}
}
