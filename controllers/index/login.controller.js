function get(req, res) {
    return res.render('index/login', {
        title: 'Log In',
        user: req.user
    });
}


export default { get };