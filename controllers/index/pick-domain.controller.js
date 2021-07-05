async function get(req, res) {
    console.log(req.session.inventory);

    return res.render('index/pick-domain', {
        user: req.user
    });
}

async function post(req, res) {

}

export default { get, post };