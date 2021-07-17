function get(req, res) {
    return res.render('admin/create-template', {
        title: 'Create Template',
        user: req.user,
        staticFiles: req.getStatic('create-template'),
        alert: req.consumeAlert()
    });
}


export default { get };

