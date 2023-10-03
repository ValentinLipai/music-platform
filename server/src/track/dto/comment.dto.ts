import { Types } from 'mongoose';

export class CommentDTO {
  readonly username: string;
  readonly text: string;
  readonly trackId: Types.ObjectId;
}
