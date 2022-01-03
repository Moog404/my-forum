import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, PostDocument } from '../models/posts/posts.schema';
import { CreatePostDto } from '../models/posts/dto/createPost.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findOne(postId: string): Promise<PostDocument> {
    const post = await this.postModel.findOne({ _id: postId });
    if (!post) {
      throw new NotFoundException('This post does not exist.');
    }
    return post;
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postModel.find();
  }

  async createOne(createPostDto: CreatePostDto): Promise<PostDocument> {
    createPostDto.date = new Date();
    return new this.postModel(createPostDto).save();
  }

  async deleteOne(postId: string): Promise<PostDocument> {
    const post = await this.postModel.findOneAndDelete({ _id: postId });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
}
