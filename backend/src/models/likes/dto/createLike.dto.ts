import { IsDate, IsMongoId } from 'class-validator';

export class CreateLikeDto {
  @IsMongoId()
  post: string;

  @IsMongoId()
  user: string;

  @IsMongoId()
  comment: string;

  @IsDate()
  date: Date;
}
