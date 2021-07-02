import http from 'http';
import express from 'express';
import session from 'express-session';

const app = express();
const server = http.createServer(app);

import index from '../routers/index.router';
import users from '../routers/users.router';
import api from '../routers/api.router';

app.set('view engine', '.ejs');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
app.use('/public', express.static('./public'));
app.use('/', index);
app.use('/users', users);
app.use('/api', api);

export default { app, server };