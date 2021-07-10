function get(req, res) {
    return res.render('users/settings', {
        user: req.user,
        alert: req.consumeAlert()
    });
}

export default { get };