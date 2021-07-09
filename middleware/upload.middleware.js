import multer from 'multer';
import path from 'path';

const allowedFileExt = ['image/jpeg', 'image/png', 'image/jpg'];

export const upload = multer({
    fileFilter: (req, file, cb) => allowedFileExt.includes(file.mimetype) ? cb(null, true) : cb('file not allowed', false),
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname).toLowerCase());
        },
    }),
});