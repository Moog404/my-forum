import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { Post } from '../posts/posts.schema';
import { User } from '../users/user.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment extends Document {
  @Prop()
  text: string;

  @Prop()
  date: Date;

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop({ type: SchemaType.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
