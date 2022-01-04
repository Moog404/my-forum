import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, LikeDocument } from '../models/likes/likes.schema';
import { CreateLikeDto } from '../models/likes/dto/createLike.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async findOne(likeId: string): Promise<LikeDocument> {
    const like = await this.likeModel.findOne({ _id: likeId });
    if (!like) {
      throw new NotFoundException('This like does not exist.');
    }
    return like;
  }

  async findAll(): Promise<LikeDocument[]> {
    return this.likeModel.find();
  }

  async findIfExists(
    userId: string,
    postId: string,
  ): Promise<Like | undefined> {
    return this.likeModel.findOne({ user: userId, post: postId }).exec();
  }

  async createOne(createLikeDto: CreateLikeDto): Promise<LikeDocument> {
    const postLike = await this.likeModel
      .findOne({ user: createLikeDto.user, post: createLikeDto.post })
      .exec();

    const commentLike = await this.likeModel
      .findOne({ user: createLikeDto.user, comment: createLikeDto.comment })
      .exec();

    if (postLike || commentLike) {
      throw new NotFoundException('This like already exist.');
    } else {
      createLikeDto.date = new Date();
      return new this.likeModel(createLikeDto).save();
    }
  }

  async deleteOne(likeId: string): Promise<LikeDocument> {
    const like = await this.likeModel.findOneAndDelete({ _id: likeId });
    if (!like) {
      throw new NotFoundException();
    }
    return like;
  }
}
