function get(req, res) {
    return res.render('index/hire-expert', {
        title: 'Hire An Expert',
        user: req.user
    });
}

function exit(req, res) {
    return res.render('index/hire-expert-exit', {
        title: 'Hire An Expert',
        user: req.user
    });
}

function post(req, res) {
    if(!req.body.domain && !req.body.logo) return res.redirect('/pick-domain');
    if(!req.body.domain) return res.redirect('/pick-domain');
    if(!req.body.logo) return res.redirect('/build-a-logo');
    
    return res.redirect(req.headers.referer);
}


export default { get, exit, post };