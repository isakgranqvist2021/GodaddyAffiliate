import { isPhoneValid, getCode } from '../../utils/helpers';
import texts from '../../utils/texts';

async function post(req, res) {
    req.body.phone = req.body.country.dial_code + req.body.phone;

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

    const code = getCode();
    try {
        await texts.sendText(`Verification Code: ${code}`, req.body.phone);
        req.session.code = code;

        return res.json({
            message: `a text message has been sent to ${req.body.phone} with a code`,
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: err.code === 21211 ? 'invalid phone number' : 'caught an error',
            success: false,
            data: null
        });
    }
}

export default { post };