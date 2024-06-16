import { type Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/images/products");
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter });
export { upload };
