import { IsDate, IsMongoId, IsString} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  text: string;

  @IsDate()
  date: Date;

  @IsMongoId()
  user: string;
}
