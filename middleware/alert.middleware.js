function consumeAlert(req, res, next) {
    req.consumeAlert = () => {
        let alert = req.session.alert;
        req.session.alert = undefined;
        return alert;
    }

    return next();
}

export default consumeAlert;