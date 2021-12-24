import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './controllers/posts.controller';
import { Post, PostSchema } from './models/posts/posts.schema';
import { PostsService } from './services/posts.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://moog:test@my-forum-test.gkzou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [AppController, PostsController],
  providers: [PostsService],
})
export class AppModule {}
