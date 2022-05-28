import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(userInput: CreateUserDto) {
    // const hashedPassword = await bcrypt.hash(userInput.password, 10);
    // try {
    //   const createdUser = await this.userService.createUser({
    //     ...userInput,
    //     password: hashedPassword,
    //   });
    try {
      const createdUser = await this.userService.createUser(userInput);
      createdUser.password = undefined;
      return createdUser;
    } catch (err) {
      throw new HttpException(
        'Somthing went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthedUser(email: string, inputPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      const ismatched = await user.checkPassword(inputPassword);
      if (!ismatched) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      // await this.verifyPassword(inputPassword, user.password);
      user.password = undefined;
      return user;
    } catch (err) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // private async verifyPassword(password: string, hashedPassword: string) {
  //   const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
  //   console.log(isPasswordMatched);
  //   if (!isPasswordMatched) {
  //     throw new HttpException(
  //       'Wrong credentials provided',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogout() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
