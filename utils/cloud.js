import env from './env';
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
    cloud_name: env.CLOUDINARY_API_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: env.NODE_ENV === 'production'
});


async function upload(file) {
    try {
        let filePath = path.resolve('./uploads/' + file);

        const uploaded = await cloudinary.v2.uploader.upload(filePath, {
            transformation: {
                width: 1920,
                height: 1080,
                crop: 'scale'
            }
        });

        fs.unlinkSync(filePath);
        return uploaded.secure_url;
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function remove(file) {
    let fileParts = file.split('/');
    let pub_id = fileParts[fileParts.length - 1]
        .replace(path.extname(fileParts[fileParts.length - 1]), '');

    try {
        const result = await cloudinary.v2.uploader.destroy(pub_id);
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default { upload, remove };