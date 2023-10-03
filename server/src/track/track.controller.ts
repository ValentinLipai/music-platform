import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDTO } from './dto/track.dto';
import { Types } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CommentDTO } from './dto/comment.dto';
import { SearchQueryValidator } from './validators/search-query.validator';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: TrackDTO) {
    const { picture, audio } = files;
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query(new ValidationPipe()) { query }: SearchQueryValidator) {
    return this.trackService.search(query);
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

  @Post('/listen/:id')
  listen(@Param('id') id: Types.ObjectId) {
    this.trackService.listen(id);
  }
}
