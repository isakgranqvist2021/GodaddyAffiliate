function get(req, res) {
    return res.render('index/hire-expert', {
        title: 'Hire An Expert',
        user: req.user
    });
}

export default { get };