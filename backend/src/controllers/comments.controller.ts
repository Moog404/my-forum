import {Body, Controller, Delete, Get, Param, Post, Request} from '@nestjs/common';
import { CreateCommentDto } from '../models/comments/dto/createComment.dto';
import { CommentsService } from '../services/comments.service';
import { Public } from '../auth/public.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Public()
  @Get()
  async findAll() {
    return this.commentsService.findAll();
  }

  @Post()
  async createOne(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.commentsService.createOne(createCommentDto, req.user._id);
  }

  @Delete(':commentId')
  async deleteOne(@Param('commentId') commentId: string, @Request() req) {
    return this.commentsService.deleteOne(commentId, req.user._id);
  }
}
