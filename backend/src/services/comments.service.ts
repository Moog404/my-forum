import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment, CommentDocument } from '../models/comments/comments.schema';
import { CreateCommentDto } from '../models/comments/dto/createComment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/users/user.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findAll(): Promise<CommentDocument[]> {
    return this.commentModel.find();
  }

  async createOne(createCommentDto: CreateCommentDto): Promise<Comment> {
    createCommentDto.date = new Date();
    return new this.commentModel(createCommentDto).save();
  }

  async deleteOne(commentId: string): Promise<CommentDocument> {
    const comment = await this.commentModel.findOneAndDelete({
      _id: commentId,
    });
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }
}
