import http from 'http';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import env from '../utils/env';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

import index from '../routers/index.router';
import users from '../routers/users.router';
import api from '../routers/api.router';
import admin from '../routers/admin.router';
import socket from '../routers/io.router';
import error from '../controllers/error';
import expressLayouts from 'express-ejs-layouts';

import { loggedIn } from '../middleware/auth.middleware';
import { isAdmin_v1 } from '../middleware/admin.middleware';
import { alerts, user, inv, staticFiles } from '../middleware/helpers.middleware';

app.set('view engine', '.ejs');
app.use(expressLayouts);

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

app.use(cors());

app.use('/public', express.static('./public'));
app.use('/uploads', express.static('./uploads'));

app.use(express.json({
    limit: '4MB'
}));

app.use(express.urlencoded({
    extended: false
}));

io.on('connection', (connection) => socket(connection, io));

app.use('*', alerts, user, inv, staticFiles);
app.use('/', index);
app.use('/users', loggedIn, users);
app.use('/api', api);
app.use('/admin', isAdmin_v1, admin);
app.use('*', error);

export default { app, server, io };