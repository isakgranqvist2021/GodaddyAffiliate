import {
    randStr,
    validateEmail,
    validatePhone
} from '../../utils/helpers';
import userModel from '../../models/user.model';

function get(req, res) {
    return res.render('index/login', {
        alert: req.consumeAlert(),
        user: req.user
    });
}

async function post(req, res) {
    if (!req.body.password) {
        req.session.alert = { type: 'error', message: 'please enter a password' };
        return res.redirect('/register' + '?at=' + req.body.authType);
    }

    if (req.body.authType !== 'email' && req.body.authType !== 'phone') {
        req.session.alert = { type: 'error', message: 'invalid form data received' };
        return res.redirect('/register' + '?at=' + req.body.authType);
    }

    const status = (() => {
        if (req.body.authType === 'email') {
            delete req.body.phone;
            return validateEmail(req.body);
        } else {
            delete req.body.email;
            return validatePhone(req.body);
        }
    })();

    if (status.type !== 'error') {
        try {
            let result = await userModel.login(req.body);
            req.session.uid = result._id;
            req.session.alert = { type: 'success', message: 'welcome' };
            return res.redirect('/users/account');
        } catch (err) {
            req.session.alert = { type: 'error', message: 'wrong password' };
            return res.redirect('/login' + '?at=' + req.body.authType);
        }

    } else {
        req.session.alert = status;
        return res.redirect('/login' + '?at=' + req.body.authType);
    }
}

export default { get, post };