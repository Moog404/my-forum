import {
  Controller,
  Request,
  Post,
  Get,
  Body, UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';
import { CreateUserDto } from './models/users/dto/create-user.dto';
import { CurrentUserType } from './auth/current-user.type';
import { CurrentUser } from './auth/current-user.decorator';
import { UsersService } from './services/users.service';
import { LocalAuthGuard } from "./auth/local-auth.guard";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    const user = await this.authService.register(createUserDto);
    return {
      message: `User ${user.username} has been created successfully (${user.createdAt}).`,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(
    @CurrentUser() user: CurrentUserType,
  ): Promise<{ access_token: string }> {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
