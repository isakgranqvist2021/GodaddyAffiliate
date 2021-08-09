import userModel from '../../models/user.model';
import { isPhoneValid, isEmailValid } from '../../utils/helpers';

async function email(req, res) {
    if (!req.body.email) return res.json({
        message: 'please enter your email address',
        success: false,
        data: null
    });

    if (!isEmailValid(req.body.email)) return res.json({
        message: 'please enter a valid email address',
        success: false,
        data: null
    });

    if (!req.body.code) return res.json({
        message: 'please enter the verification code sent to your email',
        success: false,
        data: null
    });

    if (req.body.code !== req.session.code) return res.json({
        message: 'verification code is invalid',
        success: false,
        data: null
    });

    try {
        const response = await userModel.login(req.body, { email: req.body.email });
        req.session.uid = response._id;
        delete req.session.code;

        return res.json({
            message: 'You have been signed in ✔️',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: err,
            success: false,
            data: null
        });
    }
}

async function phone(req, res) {
    if (!req.body.phone) return res.json({
        message: 'please enter your phone number',
        success: false,
        data: null
    });


    if (!req.body.code) return res.json({
        message: 'please enter your verification code',
        success: false,
        data: null
    });


    if (!isPhoneValid(req.body.phone)) return res.json({
        message: 'please enter a valid phone number',
        success: false,
        data: null
    });


    if (req.body.code !== req.session.code) return res.json({
        message: 'invalid verification code',
        success: false,
        data: null
    });

    try {
        const response = await userModel.login(req.body, { phone: req.body.phone });
        req.session.uid = response._id;
        delete req.session.code;
        return res.json({
            message: 'You have been signed in ✔️',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default { phone, email };