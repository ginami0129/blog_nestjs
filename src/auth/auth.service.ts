import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userServices: UserService) {}

  public async register(userInput: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userInput.password, 10);
    try {
      const createdUser = await this.userServices.createUser({
        ...userInput,
        password: hashedPassword,
      });
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
      const user = await this.userServices.getByEmail(email);
      await this.verifyPassword(inputPassword, user.password);
      user.password = undefined;
      return user;
    } catch (err) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
