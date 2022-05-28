import { PartialType } from '@nestjs/swagger';
import { CreateEmailConfirmedDto } from './create-email-confirmed.dto';

export class UpdateEmailConfirmedDto extends PartialType(CreateEmailConfirmedDto) {}
