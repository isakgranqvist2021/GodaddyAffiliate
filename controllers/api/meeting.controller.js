import meetingModel from "../../models/meeting.model";
import { isEmailValid, isPhoneValid } from '../../utils/helpers';

async function create(req, res) {
    if (!req.body.businessName) return res.json({
        message: 'missing business name',
        success: false,
        data: null
    });

    if (!req.body.description) return res.json({
        message: 'missing business description',
        success: false,
        data: null
    });

    if (!req.body.email || !isEmailValid(req.body.email)) return res.json({
        message: 'please enter a valid email',
        success: false,
        data: null
    });


    if (!req.body.phone || !isPhoneValid(req.body.phone)) return res.json({
        message: 'please a valid phone number',
        success: false,
        data: null
    });

    if (!req.body.socialLinks || req.body.socialLinks.length <= 0) return res.json({
        message: 'missing social media links',
        success: false,
        data: null
    });

    if (!req.body.dates || req.body.dates.length <= 0) return res.json({
        message: 'please pick a date for your meeting',
        success: false,
        data: null
    });


    try {
        await meetingModel.createRequest(req.body);
        return res.json({
            message: `your request has been received, an email will be sent to ${req.body.email} when your meeting has been approved`,
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

export default { create };