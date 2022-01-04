import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { Post } from '../posts/posts.schema';
import { User } from '../users/user.schema';
import { Comment } from '../comments/comments.schema';
import { IsDate } from 'class-validator';

export type LikeDocument = Like & Document;

@Schema()
export class Like extends Document {
  @Prop({ type: SchemaType.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'Comment' })
  comment: Comment;

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'User' })
  user: User;

  @IsDate()
  date: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
