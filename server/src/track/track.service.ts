import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schecma';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { TrackDTO } from './dto/track.dto';
import { CommentDTO } from './dto/comment.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(dto: TrackDTO): Promise<Track> {
    return this.trackModel.create({ ...dto, listenes: 0 });
  }

  async getAll(): Promise<Track[]> {
    return this.trackModel.find();
  }

  async getOne(id: Types.ObjectId): Promise<Track> {
    return this.trackModel.findById(id).populate('comments');
  }

  async delete(id: Types.ObjectId): Promise<Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track.id;
  }

  async addComment(dto: CommentDTO): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });

    track.comments.push(comment.id);

    await track.save();

    return comment;
  }
}
