import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { verificationTokenPayload } from './verificationTokenPayload.interface';

@Injectable()
export class EmailConfirmedService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  public sendVerificationLink(email: string) {
    const payload: verificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_EMAIL_EXPIRATION_TIME') + 's',
    });

    const url =
      this.configService.get('EMAIL_CONFIRMATION_URL') + `?token=${token}}`;
    const text = `Welcome to my blog, please confirm your email address, click here ${url}`;
    return this.emailService.sendMail({
      to: email,
      subject: 'email confirm',
      text,
    });
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.getByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email Already Confirmed!');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });
      if (typeof payload === 'object' && 'email' in payload) {
        console.log(payload);
        return `${payload.email}`;
      }
    } catch (e) {
      console.log(e);
      if (e?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email Confirmation Tockn Expired');
      }
      throw new BadRequestException('Token Error');
    }
  }

  public async resendEmailConfirmLink(userId: string) {
    const user = await this.userService.getById(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email Already Confirmed');
    }
    await this.sendVerificationLink(user.email);
  }
}
