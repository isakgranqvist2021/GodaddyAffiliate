function get(req, res) {
    return res.json({
        message: '',
        success: true,
        data: req.session.inv
    });
}

export default { get };