import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // Create the controller with the PostsService
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?email=value
  findAll(@Query('email') email?: string) {
    return this.usersService.findAll(email);
  }

  @Post() // POST /users
  create(@Body() user: { email: string; password: string; joinDate: Date }) {
    return this.usersService.create(user);
  }
}
