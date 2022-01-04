import { LikesService } from '../services/likes.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { CreateLikeDto } from '../models/likes/dto/createLike.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Public()
  @Get()
  async findAll() {
    return this.likesService.findAll();
  }

  @Post()
  async createOne(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.createOne(createLikeDto);
  }
}
