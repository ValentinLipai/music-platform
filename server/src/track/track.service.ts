import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schecma';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { TrackDTO } from './dto/track.dto';
import { CommentDTO } from './dto/comment.dto';
import { FILE_TYPE, FileService } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}

  async create(dto: TrackDTO, picture: string, audio: string): Promise<Track> {
    const audioFilePath = this.fileService.createFile(FILE_TYPE.AUDIO, audio);
    const pictureFilePath = this.fileService.createFile(
      FILE_TYPE.IMAGE,
      picture,
    );
    return this.trackModel.create({
      ...dto,
      listens: 0,
      picture: pictureFilePath,
      audio: audioFilePath,
    });
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    return this.trackModel.find().skip(offset).limit(count);
  }

  async getOne(id: Types.ObjectId): Promise<Track> {
    return this.trackModel.findById(id).populate('comments');
  }

  async delete(id: Types.ObjectId): Promise<Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);

    this.fileService.deleteFile(track.picture);
    this.fileService.deleteFile(track.audio);

    return track.id;
  }

  async addComment(dto: CommentDTO): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });

    track.comments.push(comment.id);

    await track.save();

    return comment;
  }

  async listen(id: Types.ObjectId): Promise<void> {
    const track = await this.trackModel.findById(id);

    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    return this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
  }
}
