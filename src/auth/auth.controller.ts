import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async registor(@Body() userInput: CreateUserDto) {
    return this.authService.register(userInput);
  }

  @Post('login')
  async login(@Body() userInput: any) {
    return this.authService.getAuthedUser(userInput.email, userInput.password);
  }
}
