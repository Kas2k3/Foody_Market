import { Injectable, BadRequestException } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import * as streamifier from 'streamifier';

@Injectable()
export class UserCloudinaryService {
  constructor() {
    this.cloudinaryConfig();
  }

  // Cấu hình Cloudinary
  private cloudinaryConfig() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Hàm upload ảnh lên Cloudinary và trả về URL ảnh
  async uploadImage(file: Express.Multer.File): Promise<string> {
    // Tạo tên file duy nhất dựa trên UUID và tên file gốc
    const fileName = `${uuidv4()}-${file.originalname}`;
    const stream = streamifier.createReadStream(file.buffer);

    try {
      // Upload ảnh lên Cloudinary bằng stream
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            public_id: fileName,
            folder: 'user_avatars/', // Folder lưu ảnh đại diện người dùng trên Cloudinary
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.pipe(uploadStream);
      });

      // Trả về URL ảnh đã upload
      return result.secure_url;
    } catch (error) {
      throw new BadRequestException('Image upload failed');
    }
  }
}
