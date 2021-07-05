async function upload(req, res) {
    return res.json({
        message: `${req.files.length} files uploaded`,
        success: true,
        data: req.files.map(file => file.filename)
    });
}

export default upload;