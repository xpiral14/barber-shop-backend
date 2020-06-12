import multer from 'multer';
import { resolve, extname } from 'path';
import { Request } from 'express';
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, resolve('tmp', 'perfil_images'));
  },
  filename: (req, file, cb) => {
    const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSufix + '_' + file.fieldname + extname(file.originalname));
  },
});
const upload = multer({ storage });

export default upload;
