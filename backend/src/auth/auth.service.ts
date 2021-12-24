import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../models/users/dto/createPost.dto';
import { User } from '../models/users/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly HASH_SALT_ROUNDS = 10;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.findIfExists(
      createUserDto.username,
      createUserDto.email,
    );

    if (user) {
      throw new ConflictException('User or email already exist');
    }

    const hash = await bcrypt.hash(
      createUserDto.password,
      this.HASH_SALT_ROUNDS,
    );
    return this.usersService.createOne({ ...createUserDto, password: hash });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
