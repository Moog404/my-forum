import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';
import { User, UserDocument } from 'src/models/users/user.schema';
import { CreateUserDto } from '../models/users/dto/createPost.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findIfExists(
    username: string,
    email: string,
  ): Promise<User | undefined> {
    return this.userModel.findOne({
      username: username,
      email: email,
    });
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel({
      ...createUserDto,
      createdAt: moment().toDate(),
    });
    return user.save();
  }
}
