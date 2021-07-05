function get(req, res) {
    return res.render('index/contact', {
        user: req.user
    });
}

export default { get };