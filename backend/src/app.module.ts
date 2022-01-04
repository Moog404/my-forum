import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './controllers/posts.controller';
import { Post, PostSchema } from './models/posts/posts.schema';
import { PostsService } from './services/posts.service';
import { AppController } from './app.controller';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { Comment, CommentSchema } from './models/comments/comments.schema';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { User, UserSchema } from './models/users/user.schema';
import { UsersService } from './services/users.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PostsEvent } from './events/posts.event';
import { LikesController } from './controllers/likes.controller';
import { LikesService } from './services/likes.service';
import { Like, LikeSchema } from './models/likes/likes.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://moog:test@my-forum-test.gkzou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
      { name: Like.name, schema: LikeSchema },
    ]),
    AuthModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [
    AppController,
    PostsController,
    CommentsController,
    LikesController,
  ],
  providers: [
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
    PostsService,
    CommentsService,
    UsersService,
    LikesService,
    PostsEvent,
  ],
})
export class AppModule {}
