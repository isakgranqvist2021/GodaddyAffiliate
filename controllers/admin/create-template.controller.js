function get(req, res) {
    return res.render('admin/create-template', {
        user: req.user,
        alert: req.consumeAlert()
    });
}


export default { get };