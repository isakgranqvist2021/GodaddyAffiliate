import cloud from '../../utils/upload';

async function upload(req, res) {

    const files = await Promise.all(req.files.map(async (file) => {
        return await cloud.upload(file.filename);
    }));

    return res.json({
        message: `${req.files.length} files uploaded`,
        success: true,
        data: files
    });
}

export default upload;