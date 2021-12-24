import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from '../models/posts/dto/createPost.dto';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Post()
  async createOne(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createOne(createPostDto);
  }

  @Delete(':postId')
  async deleteOne(@Param('postId') postId: string) {
    return this.postsService.deleteOne(postId);
  }
}
