function get(req, res) {
    return res.render('index/pick-direction', {
        title: 'Pick Direction',
        user: req.user
    });
}

export default { get };