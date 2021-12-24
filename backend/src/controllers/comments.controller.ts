import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCommentDto } from '../models/comments/dto/createComment.dto';
import { CommentsService } from '../services/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll() {
    return this.commentsService.findAll();
  }

  @Post()
  async createOne(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createOne(createCommentDto);
  }

  @Delete(':commentId')
  async deleteOne(@Param('commentId') commentId: string) {
    return this.commentsService.deleteOne(commentId);
  }
}
