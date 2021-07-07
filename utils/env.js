import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    NODE_ENV: process.env.NODE_ENV,

    DB_URI: process.env.DB_URI,

    GODADDY_API_KEY: process.env.GODADDY_API_KEY,
    GODADDY_API_SECRET: process.env.GODADDY_API_SECRET,

    CLOUDINARY_API_NAME: process.env.CLOUDINARY_API_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
};