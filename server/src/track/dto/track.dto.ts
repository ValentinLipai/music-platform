import { IsString, IsNotEmpty, Length } from 'class-validator';

export class TrackDTO {
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  readonly artist: string;

  @IsString()
  @IsNotEmpty()
  @Length(1)
  readonly text: string;
}
