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
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { response, Response } from 'express';
import { EmailConfirmedService } from 'src/email-confirmed/email-confirmed.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import JwtAuthGuard from './jwtAuth.guard';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './localAuth.guard';
import { RequestWithUser } from './requestWithUser.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmedService: EmailConfirmedService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async registor(@Body() userInput: CreateUserDto) {
    // return this.authService.register(userInput);
    const user = await this.authService.register(userInput);
    console.log(user);
    await this.emailConfirmedService.sendVerificationLink(user.email);
    return user;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    // console.log(req);
    const { user } = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return res.send(user);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    return res.sendStatus(200);
  }
}
