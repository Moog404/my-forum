import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../models/comments/comments.schema';
import { PostDocument } from '../models/posts/posts.schema';

export type PostRemovedEvent = {
  post: PostDocument;
};

export const postEvents = {
  removed: 'post.removed',
};

@Injectable()
export class PostsEvent {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  @OnEvent(postEvents.removed)
  async deleteAllPostComments(payload: PostRemovedEvent) {
    const { post } = payload;
    await this.commentModel.deleteMany({ post });
  }
}
