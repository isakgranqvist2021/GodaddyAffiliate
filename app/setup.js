import http from 'http';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import env from '../utils/env';

const app = express();
const server = http.createServer(app);

import index from '../routers/index.router';
import users from '../routers/users.router';
import api from '../routers/api.router';
import admin from '../routers/admin.router';

import consumeAlert from '../middleware/alert.middleware';
import findUser from '../middleware/find.middleware';
import setInventory from '../middleware/set-inventory.middleware';
import adminMiddleware from '../middleware/admin.middleware';

app.set('view engine', '.ejs');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: env.DB_URI
    }),
    cookie: {
        secure: false,
    }
}));

app.use('/public', express.static('./public'));
app.use('/uploads', express.static('./uploads'));
app.use('/api/uploads', express.static('./uploads'));

app.use(express.json({
    limit: '4MB'
}));
app.use(express.urlencoded({
    extended: false
}));

app.use('*', consumeAlert, findUser, setInventory);
app.use('/', index);
app.use('/users', users);
app.use('/api', api);
app.use('/admin', adminMiddleware.defaultProtection, admin);

export default { app, server };