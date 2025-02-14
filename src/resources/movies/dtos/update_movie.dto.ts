import { IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  title?: string;
  poster?: Express.Multer.File;
  @IsString()
  seriesName?: string;
  @IsString()
  genreIds?: any;
  partNumber?: number;
  fistPart?: boolean;
}
