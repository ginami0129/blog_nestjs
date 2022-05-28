import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { utimesSync } from 'fs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepo.findOne({ email });

    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async getById(id: string) {
    const user = await this.userRepo.findOne({ id });

    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.userRepo.create(user);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async markEmailAsConfirmed(email: string) {
    return this.userRepo.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }
}
