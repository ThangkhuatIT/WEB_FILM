import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { UPLOAD_SERVICE } from './interfaces/upload.interface';

@Module({
  exports: [CloudinaryProvider, UPLOAD_SERVICE],
  providers: [
    CloudinaryProvider,
    {
      provide: UPLOAD_SERVICE,
      useClass: CloudinaryService,
    },
  ],
})
export class UploadModule {}
