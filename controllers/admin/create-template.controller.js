function get(req, res) {
    return res.render('admin/create-template', {
        title: 'Create Template',
        user: req.user,
        alert: req.consumeAlert()
    });
}


export default { get };