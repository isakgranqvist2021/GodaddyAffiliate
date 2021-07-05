function get(req, res) {
    return res.render('admin/home', {
        user: req.user,
        alert: req.consumeAlert()
    });
}

export default { get };