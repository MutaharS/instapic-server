import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async create(user: { email: string; password: string; joinDate: Date }) {
    return this.usersRepository.create({
      userId: randomUUID().toString(),
      email: user.email,
      password: user.password,
      joinDate: user.joinDate,
    });
  }
}
