import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { uuid } from 'uuidv4';
import { Response } from 'express';
import { CreatePhotoCommentDto } from './dto/photo-comment.dto';
import { Photo } from './model/photo.model';

@Injectable()
export class PhotosService {
  folderPath = path.join(__dirname, 'uploads');
  photos: Photo[] = [];

  constructor() {
    // Create the uploads folder if it doesn't exist
    if (!fs.existsSync(this.folderPath)) {
      fs.mkdirSync(this.folderPath);
    }
  }

  async uploadPhoto(file: Express.Multer.File) {
    const fileName = `${uuid()}-${file.originalname}`;

    // write file to local disk
    const filePath = path.join(this.folderPath, fileName);
    fs.writeFileSync(filePath, file.buffer);

    // update photos array
    const photo = new Photo();
    photo.fileName = fileName;
    this.photos.push(photo);

    // return the photo
    return photo;
  }

  async getPhotos() {
    // return the photos array
    return this.photos;
  }

  async serveFile(fileName: string, res: Response) {
    const filePath = path.join(this.folderPath, fileName);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Stream the file to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      // Return a 404 if the file doesn't exist
      res.status(404).send('File not found');
    }
  }
  
  async addComment(fileName: string, createPhotoCommentDto: CreatePhotoCommentDto) {
    // Find the photo
    const photo = this.photos.find((photo) => photo.fileName === fileName);
    if (!photo) {
      throw new Error('Photo not found');
    }

    // Add the comment to the photo
    const comment = {
      ...createPhotoCommentDto,
      createdAt: new Date(),
    };
    photo.comments.push(comment);
    return comment;
  }
}
