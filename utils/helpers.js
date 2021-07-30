import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import env from './env';

export function randStr(n = 10) {
    let runes = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890_'.split('');
    let val = '';

    for (let i = 0; i < n; i++)
        val += runes[Math.floor(Math.random() * runes.length)];

    return val;
}

export async function sendEmail(to, message) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: env.GMAIL_EMAIL,
            pass: env.GMAIL_PW,
        },
    });

    let info = await transporter.sendMail({
        from: '<' + env.GMAIL_EMAIL + '>',
        to: to,
        subject: 'Verification Code',
        html: message
    });

    console.log(info);
}

export function getCode() {
    const runes = '0123456789';
    runes.split('');
    let val = '';

    for (let i = 0; i < 6; i++) {
        val += runes[Math.floor(Math.random() * runes.length)]
    }

    return val;
}

export async function getUserInfo() {
    const ipInfo = await fetch('http://ip-api.com/json/?fields=61439', {
        method: 'GET'
    });

    return await ipInfo.json();
}

export function isEmailValid(email) {
    if (email.length > 50) return false;

    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

export function isPhoneValid(phone) {
    if (phone.length > 15) return false;

    return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(phone);
}


export function validateEmail(body) {
    if (!body.email) {
        return { type: 'error', message: 'please enter your email' };
    }

    if (!isEmailValid(body.email)) {
        return { type: 'error', message: 'please enter a valid email' };
    }

    return { type: 'success' };
}

export function validatePhone(body) {
    if (!body.phone) {
        return { type: 'error', message: 'please enter your phone number' };
    }

    if (!isPhoneValid(body.phone)) {
        return { type: 'error', message: 'please enter a valid phone number' };
    }

    return { type: 'success' };
}


export function constructItem(data, currency) {
    return {
        quantity: 1,
        price_data: {
            currency: currency.code,
            unit_amount: data.price,
            product_data: {
                name: data.title,
                images: data.images
            }
        }
    }
}

// markup for domains (price * 1.4)
export const multiplier = 1.4;

/* 
    fetch pricing data for currencies and write output to file 
    250 api calls per month for free
    should be updated (250 / 30) times per month
*/

export async function getPricingData() {
    try {
        const url = `http://data.fixer.io/api/latest?access_key=${env.FIXER_API_KEY}&format=1&symbols=EUR,SEK,XOF,USD`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        let output = [];
        for (let k in data.rates) {
            output.push({
                code: k,
                value: data.rates[k]
            });
        }

        fs.writeFileSync(path.resolve('.', path.join('./data/currencies.json')), JSON.stringify(output, null, 4));
        return Promise.resolve('currencies have been updated');
    } catch (err) {
        console.log(err);
        return Promise.reject('unable to update currencies');
    }
}

/* nessecary because godaddy and stripe uses different amount of zeros */
export function getPriceDomain(price, currency) {
    return Math.round(price * multiplier * 0.000001 * currency.value);
}

export function getPriceTemplate(price, currency) {
    return Math.round(price * currency.value);
}

/* just for decorative purposes */
export const keyImg = 'https://res.cloudinary.com/isak-tech/image/upload/v1627337790/pexels-pixabay-279810_htczxl.jpg';
export const serverImg = 'https://res.cloudinary.com/isak-tech/image/upload/v1627337790/pexels-brett-sayles-2881224_wojdeo.jpg';
export const logoImg = 'https://res.cloudinary.com/isak-tech/image/upload/v1627576029/pexels-scott-webb-430205_qqzmaq.jpg';