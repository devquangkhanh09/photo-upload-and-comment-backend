import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { Response } from 'express';

@Controller('photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return this.photosService.uploadPhoto(file);
  }

  @Get('')
  async getPhotos() {
    return this.photosService.getPhotos();
  }

  @Get(':filename')
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    return this.photosService.serveFile(filename, res);
  }
}
