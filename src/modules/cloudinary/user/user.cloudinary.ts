import { Injectable, BadRequestException } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import * as streamifier from 'streamifier';

@Injectable()
export class UserCloudinaryService {
  constructor() {
    this.cloudinaryConfig();
  }

  private cloudinaryConfig() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const stream = streamifier.createReadStream(file.buffer);

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            public_id: fileName,
            folder: 'user_avatars/',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.pipe(uploadStream);
      });

      return result.secure_url;
    } catch (error) {
      throw new BadRequestException({
        resultMessage: {
          en: 'Image upload failed.',
          vn: 'Đăng tải ảnh thất bại.'
        },
        resultCode: '00158',
      });
    }
  }
}
