import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
