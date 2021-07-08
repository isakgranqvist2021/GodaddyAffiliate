import { randStr, isPhoneValid } from '../../utils/helpers';
import texts from '../../utils/texts';

async function post(req, res) {
    if (!req.body.phone) return res.json({
        message: 'please enter your phone number',
        success: false,
        data: null
    });

    if (!isPhoneValid) return res.json({
        message: 'please enter a valid phone number',
        success: false,
        data: null
    });


    let textToken = (() => {
        const runes = '0123456789';
        runes.split('');
        let val = '';

        for (let i = 0; i < 6; i++) {
            val += runes[Math.floor(Math.random() * runes.length)]
        }

        return val;
    })();

    await texts.sendText(`Verification Code: ${textToken}`, req.body.phone);
    req.session.textToken = textToken;

    return res.json({
        message: `a text message has been sent to ${req.body.phone} with a code`,
        success: true,
        data: null
    });
}

async function put(req, res) {
    if (!req.body.token) return res.json({
        message: 'missing token',
        success: false,
        data: null
    });

    if (!req.session.textToken) return res.json({
        message: 'invalid session',
        success: false,
        data: null
    });


    if (req.body.token === req.session.textToken) {
        delete req.session.textToken;
        return res.json({
            message: 'phone has been verified',
            success: true,
            data: null
        });
    }
}

export default { post, put };