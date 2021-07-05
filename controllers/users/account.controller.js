function get(req, res) {
    return res.render('users/account', {
        alert: req.consumeAlert(),
        user: req.user
    });
}


export default { get };