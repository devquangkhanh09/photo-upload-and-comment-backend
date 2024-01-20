import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { Response } from 'express';
import { CreatePhotoCommentDto } from './dto/photo-comment.dto';

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

  @Post(':filename/comments')
  addComment(@Param('filename') filename: string, @Body() body: CreatePhotoCommentDto) {
    return this.photosService.addComment(filename, body);
  }
}
