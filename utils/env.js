import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    NODE_ENV: process.env.NODE_ENV,

    DB_URI: [
        'mongodb+srv://' + process.env.DB_USER,
        ':' + process.env.DB_PASSWORD,
        '@' + process.env.DB_CLUSTER,
        '/' + process.env.DB_COLLECTION,
        '?retryWrites=true&w=majority'
    ].join(''),

    GODADDY_API_KEY: process.env.GODADDY_API_KEY,
    GODADDY_API_SECRET: process.env.GODADDY_API_SECRET,

    CLOUDINARY_API_NAME: process.env.CLOUDINARY_API_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER
};