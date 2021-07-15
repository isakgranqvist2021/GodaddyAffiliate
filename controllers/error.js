function error(req, res) {
    return res.render('error', {
        title: 'Error',
        user: req.user
    });
}

export default error;