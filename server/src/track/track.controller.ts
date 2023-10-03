import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDTO } from './dto/track.dto';
import { Types } from 'mongoose';
import { CommentDTO } from './dto/comment.dto';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  create(@Body() dto: TrackDTO) {
    return this.trackService.create(dto);
  }

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: Types.ObjectId) {
    return this.trackService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: Types.ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CommentDTO) {
    return this.trackService.addComment(dto);
  }
}
