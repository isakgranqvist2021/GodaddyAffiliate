function error(req, res) {
    return res.render('error', {
        user: req.user
    });
}

export default error;