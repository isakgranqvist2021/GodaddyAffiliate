function get(req, res) {
    return res.render('index/about', {
        user: req.user
    });
}

export default { get };