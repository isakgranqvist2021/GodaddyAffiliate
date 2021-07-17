
function get(req, res) {
    console.log(req.getStatic());

    return res.render('index/index', {
        title: 'Home',
        user: req.user,
        staticFiles: req.getStatic('index'),
        alert: req.consumeAlert()
    });
}

export default { get };
