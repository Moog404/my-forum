import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';
import { User, UserDocument } from 'src/models/users/user.schema';
import { CreateUserDto } from '../models/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneWithoutPassword(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }, { password: 0 }).exec()
  }

  async findIfExists(
    username: string,
    email: string,
  ): Promise<User | undefined> {
    return this.userModel
      .findOne({
        $or: [
          {
            username,
          },
          {
            email,
          },
        ],
      })
      .exec();
  }

  async createOne(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel({
      ...createUserDto,
      createdAt: moment().toDate(),
    });
    return user.save();
  }
}
