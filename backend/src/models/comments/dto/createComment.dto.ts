import { IsDate, IsMongoId, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsDate()
  date: Date;

  @IsMongoId()
  post: string;
}
