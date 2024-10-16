import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];
  private id = 0;

  findAll(email?: string) {
    if (email) {
      const user = this.users.find((u) => u.email === email);
      return user;
    }
    return this.users;
  }

  create(user: { email: string; password: string; joinDate: Date }) {
    this.id++;
    this.users.push({ id: this.id, ...user });
    return user;
  }
}
