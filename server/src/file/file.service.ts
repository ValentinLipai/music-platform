import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

export enum FILE_TYPE {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable({})
export class FileService {
  createFile(type: FILE_TYPE, file) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuidv4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return type + '/' + fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  deleteFile(fileName: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', fileName);
      fs.unlinkSync(filePath);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return;
  }
}
