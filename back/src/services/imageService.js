import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { ImageModel } from '../db/models/imageModel.js';
import sharp from 'sharp';

class imageService {
  static async generateUniqueFileName(file) {
    const uniqueSuffix = `${Date.now()}`;
    const extension = file.originalname.split('.').pop(); // 확장자 추출
    const fileName = `formData-${uniqueSuffix}.${extension}`;
    return fileName;
  }

  static async uploadImage({ file }) {
    if (!file) {
      throw new Error('No image file uploaded.');
    }
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/bmp',
      'image/gif',
      'image/jpg',
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type');
    }

    const __fileName = fileURLToPath(import.meta.url); // 현재 모듈의 URL을 가져오기
    const __dirName = path.dirname(__fileName); // 디렉토리 경로를 추출

    const fileName = await imageService.generateUniqueFileName(file);

    const uploadsPath = path.resolve(__dirName, '..', '..', 'uploads');
    const imagePath = path.join(uploadsPath, fileName);

    const imageBuffer = await sharp(file.path).toBuffer();
    await sharp(imageBuffer).toFile(imagePath);

    // 이상한 숫자파일 삭제
    fs.unlinkSync(file.path);

    const newImage = { fileName: fileName, path: imagePath };
    const createImage = await ImageModel.create({ newImage });
    return createImage;
  }

  static async uploadStableImage(imageData) {
    const uniqueSuffix = `${Date.now()}`;
    const fileName = `stable-${uniqueSuffix}.png`;
    const filePath = `uploads/${fileName}`;
    fs.writeFileSync(filePath, imageData);
    const fullFilePath = path.resolve(filePath);
    const newImage = {
      fileName: fileName,
      path: fullFilePath,
    };
    const createImage = await ImageModel.create({ newImage });
    return createImage;
  }
}

export { imageService };
