import { sendEmail, getCode } from '../../utils/helpers';

async function post(req, res) {
    const code = getCode();

    req.session.code = code;
    await sendEmail(req.body.email, `<p>Verification Code: ${code}</p>`);

    return res.json({
        message: `an email has been sent to ${req.body.email} with a verification code`,
        success: true,
        data: null
    });
}

export default { post };