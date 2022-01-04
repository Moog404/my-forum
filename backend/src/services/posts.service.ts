import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, PostDocument } from '../models/posts/posts.schema';
import { CreatePostDto } from '../models/posts/dto/createPost.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { postEvents, PostRemovedEvent } from '../events/posts.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

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

  async createOne(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<PostDocument> {
    createPostDto.date = new Date();
    createPostDto.user = userId;
    return new this.postModel(createPostDto).save();
  }

  async deleteOne(postId: string, userId: string): Promise<PostDocument> {
    const post = await this.findOne(postId);
    if (!post) {
      throw new NotFoundException();
    }

    if (post.user.toString() === userId) {
      this.eventEmitter.emit(postEvents.removed, { post } as PostRemovedEvent);
      const deletedPost = await this.postModel.findOneAndDelete({
        _id: postId,
      });
      return deletedPost;
    } else {
      throw new NotFoundException('You are not allowed to delete this post');
    }
  }
}
