function get(req, res) {
    return res.render('index/index', {
        user: req.user
    });
}

export default { get };
