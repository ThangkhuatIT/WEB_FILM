import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dtos/create_movie.dto';
import { Movie } from './movie.entity';
import { DataSource, DeleteResult, QueryRunner, Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { BadRequestException, Inject } from '@nestjs/common';
import { CloudinaryService } from 'src/upload/cloudinary.service';
import { UPLOAD_SERVICE } from 'src/upload/interfaces/upload.interface';
import { GenreService } from '../genres/genre.service';
import { UploadFolder } from 'src/upload/enum/folder.enum';
import { slug } from 'src/common/slug';
import { UpdateMovieDto } from './dtos/update_movie.dto';

export class MovieService extends BaseService<Movie> {
  constructor(
    @InjectRepository(Movie) movieRepository: Repository<Movie>,
    @Inject(UPLOAD_SERVICE) private readonly uploadService: CloudinaryService,
    private readonly genreService: GenreService,
  ) {
    super(movieRepository);
  }
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { poster, genreIds, title, ...movieData } = createMovieDto;
    const [uploadResult, genres] = await Promise.all([
      this.uploadService.uploadFile(poster, {
        folder: UploadFolder.FILM_IMAGE,
      }),
      this.genreService.findByIds(JSON.parse(genreIds)),
    ]);
    const movie = await this.store({
      ...movieData,
      title:title,
      slug: slug(title),
      posterUrl: uploadResult.url,
      posterId: uploadResult.fileId,
      genres: genres,
    });
    return movie;
  }
  async updateMovie(id: string, data: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findById(id);
    if (!movie) {
      throw new BadRequestException('Film not found');
    }

    const { title, poster, seriesName, genreIds, partNumber, fistPart } = data;

    if (poster) {
      const [deleteResult, uploadResult] = await Promise.all([
        this.uploadService.deleteFile(movie.posterId),
        this.uploadService.uploadFile(poster, {
          folder: UploadFolder.FILM_IMAGE,
        }),
      ]);

      movie.posterId = uploadResult?.fileId;
      movie.posterUrl = uploadResult?.url;
    }

    if (title) movie.title = title;
    if (seriesName) movie.seriesName = seriesName;
    if (partNumber) movie.partNumber = partNumber;
    if (fistPart !== undefined) movie.fistPart = fistPart;

    if (genreIds) {
      const genres = await this.genreService.findByIds(JSON.parse(genreIds));
      movie.genres = genres;
    }

    await movie.save();
    return movie;
  }
  // async deleteMovie(id: string): Promise<DeleteResult> {}
}
