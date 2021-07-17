function get(req, res) {
    return res.render('admin/create-template', {
        title: 'Create Template',
        user: req.user
    });
}


export default { get };

