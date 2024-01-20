import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { uuid } from 'uuidv4';
import { Response } from 'express';

@Injectable()
export class PhotosService {
  folderPath = path.join(__dirname, 'uploads');

  async uploadPhoto(file: Express.Multer.File) {
    const fileName = `${uuid()}-${file.originalname}`;

    // write file to local disk
    const filePath = path.join(this.folderPath, fileName);
    fs.writeFileSync(filePath, file.buffer);

    // return file name
    return { fileName };
  }

  async getPhotos() {
    if (!fs.existsSync(this.folderPath)) {
      // create folder if it doesn't exist
      fs.mkdirSync(this.folderPath);
    }

    // get all files from the uploads folder
    const files = fs.readdirSync(this.folderPath);

    // return the file names as an array
    return files.map(file => ({ fileName: file }));
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
}
