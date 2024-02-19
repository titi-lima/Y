import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { v2 } from 'cloudinary';

const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    public_id: (_, file) => file.filename,
  },
});

const parser = multer({ storage });

export default parser;
