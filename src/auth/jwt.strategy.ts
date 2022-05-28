// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { Request } from 'express';
// import { ExtractJwt } from 'passport-jwt';
// import { Strategy } from 'passport-local';
// import { UserService } from 'src/user/user.service';
// import { TokenPayload } from './tokenPayload.interface';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly userService: UserService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req: Request) => {
//           return req?.cookies?.Authentication;
//         },
//       ]),
//       secretOrKey: configService.get('JWT_SECRET'),
//     });
//   }

//   async validate(payload: TokenPayload) {
//     return this.userService.getById(payload.userId);
//   }
// }

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.userId);
  }
}
