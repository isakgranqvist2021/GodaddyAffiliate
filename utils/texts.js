import env from './env';
import twilio from 'twilio';

const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

async function sendText(message, to) {
    try {
        return await client.messages.create({
            body: message,
            from: env.TWILIO_PHONE_NUMBER,
            to: to
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { sendText };