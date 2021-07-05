function get(req, res) {
    req.session.uid = undefined;
    req.session.alert = { type: 'success', message: 'logged out' };
    return res.redirect('/login');
}

export default { get };