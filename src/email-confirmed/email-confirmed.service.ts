import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { verificationTokenPayload } from './verificationTokenPayload.interface';

@Injectable()
export class EmailConfirmedService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
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
}
