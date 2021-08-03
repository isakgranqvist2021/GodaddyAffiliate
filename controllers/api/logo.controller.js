import userModel from '../../models/user.model';
import { getToken, ssoLink } from '../../utils/logo';


async function get(req, res) {
    const user = await userModel.findUser({ _id: req.session.uid });
    const token = await getToken();
    const link = await ssoLink(req.session.uid, token.access_token);

    return res.json({
        message: '',
        success: true,
        data: {
            credits: user.logoCredits,
            ssoLink: link
        }
    });
}

async function post(req, res) {
    return res.json({
        message: 'link generated',
        success: true,
        data: ''
    });
}

async function remove(req, res) {
    if (!req.body.credit) return res.json({
        message: 'invalid body',
        success: false,
        data: null
    });

    const user = await userModel.findUser({ _id: req.session.uid });

    user.logoCredits.splice(user.logoCredits.findIndex(c => c === req.body.credit), 1);
    await user.save();

    return res.json({
        message: 'credit has been removed',
        success: true,
        data: null
    });
}

export default { post, get, remove };