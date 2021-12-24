import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import { CreatePostDto } from '../models/posts/dto/createPost.dto';
import { PostsService } from '../services/posts.service';
import {LocalAuthGuard} from "../auth/local-auth.guard";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async createOne(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createOne(createPostDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':postId')
  async deleteOne(@Param('postId') postId: string) {
    return this.postsService.deleteOne(postId);
  }
}
