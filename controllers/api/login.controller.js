import userModel from '../../models/user.model';
import { isPhoneValid } from '../../utils/helpers';

async function post(req, res) {
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
        const response = await userModel.login(req.body);
        req.session.uid = response._id;
        delete req.session.code;
        return res.json({
            message: 'success',
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

export default { post };