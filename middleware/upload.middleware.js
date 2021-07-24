import multer from 'multer';
import path from 'path';

const allowedFileExt = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/gif',
    'image/svg+xml'
];

const storage = multer.diskStorage({
    destination(req, file, next) {
        return next(null, path.resolve('./uploads'));
    },
    filename(req, file, next) {
        return next(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname).toLowerCase());
    },
    onError(req, res, next) {
        console.log('err');
    }
});

function fileFilter(req, file, next) {
    return allowedFileExt.includes(file.mimetype) ? next(null, true) : next('file not allowed', false)
};

export function upload(req, res, next) {
    const instance = multer({ fileFilter, storage }).array('file', 5);

    instance(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            req.session.alert = { type: 'error', message: 'an error has occured' };
            return res.redirect(req.headers.referer);
        } else if (err) {
            req.session.alert = { type: 'error', message: 'an error has occured' };
            return res.redirect(req.headers.referer);
        }

        next();
    });
}