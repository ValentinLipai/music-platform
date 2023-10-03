import { IsString, IsNotEmpty, Length } from 'class-validator';

export class SearchQueryValidator {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  readonly query: string;
}
