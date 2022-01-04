import {Body, Controller, Delete, Get, Param, Post, Request} from '@nestjs/common';
import { CreatePostDto } from '../models/posts/dto/createPost.dto';
import { PostsService } from '../services/posts.service';
import { Public } from '../auth/public.decorator';
import { Post as UserPost } from 'src/models/posts/posts.schema';
import { postEvents, PostRemovedEvent } from '../events/posts.event';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Post()
  async createOne(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.createOne(createPostDto, req.user._id);
  }

  @Delete(':postId')
  async delete(
    @Param('postId') postId: string,
    @Request() req,
  ): Promise<UserPost> {
    return this.postsService.deleteOne(postId, req.user._id);
  }
}
