import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { User, UserDocument } from '../models/users/user.schema';
import * as bcrypt from 'bcrypt';
import { CurrentUserType } from './current-user.type';

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
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      const { username, _id } = user as UserDocument;
      return { username, _id };
    }

    return null;
  }

  async login(user: CurrentUserType): Promise<{ access_token: string }> {
    const payload: CurrentUserType = { username: user.username, _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
