function get(req, res) {
    return res.render('index/index', {
        title: 'Home',
        user: req.user
    });
}

export default { get };
