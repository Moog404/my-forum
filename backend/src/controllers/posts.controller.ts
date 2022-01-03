import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from '../models/posts/dto/createPost.dto';
import { PostsService } from '../services/posts.service';
import { Public } from '../auth/public.decorator';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Post as UserPost } from 'src/models/posts/posts.schema';
import { postEvents, PostRemovedEvent } from '../events/posts.event';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Public()
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Post()
  async createOne(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createOne(createPostDto);
  }

  @Delete(':postId')
  async delete(@Param('postId') postId: string): Promise<UserPost> {
    const post = await this.postsService.findOne(postId);
    this.eventEmitter.emit(postEvents.removed, { post } as PostRemovedEvent);
    return this.postsService.deleteOne(postId);
  }
}
