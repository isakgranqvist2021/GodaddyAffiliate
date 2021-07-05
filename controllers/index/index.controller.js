export default function index(req, res) {
    return res.render('index/index', {
        user: req.user
    });
}
