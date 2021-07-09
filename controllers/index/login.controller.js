function get(req, res) {
    return res.render('index/login', {
        alert: req.consumeAlert(),
        user: req.user
    });
}


export default { get };