function get(req, res) {
    return res.render('index/pick-logo', {
        user: req.user
    });
}

function post(req, res) {

}

export default { get, post };