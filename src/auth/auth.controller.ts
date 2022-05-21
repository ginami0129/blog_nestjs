import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './localAuth.guard';
import { RequestWithUser } from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async registor(@Body() userInput: CreateUserDto) {
    return this.authService.register(userInput);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: RequestWithUser) {
    const user = req.user;
    return user;
  }
}
