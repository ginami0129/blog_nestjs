import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';

@Injectable()
export class EmailConfirmGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req: RequestWithUser = context.switchToHttp().getRequest();
    if (!req.user?.isEmailConfirmed) {
      throw new UnauthorizedException('Confirm Your Email First!');
    }
    return true;
  }
}
