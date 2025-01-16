import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadOptions, UploadResponse } from './interfaces/upload.interface';
import * as streamifier from 'streamifier';
@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    options?: UploadOptions,
  ): Promise<UploadResponse> {
    return new Promise<UploadResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: options.folder },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            fileId: result.public_id,
            url: result.url,
          });
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  async deleteFile(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}
