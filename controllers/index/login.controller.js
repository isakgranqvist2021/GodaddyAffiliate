
function get(req, res) {
    return res.render('index/login', {
        title: 'Log In',
        staticFiles: req.getStatic('login'),
        alert: req.consumeAlert(),
        user: req.user
    });
}


export default { get };