import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

import index from '../routers/index';
import users from '../routers/users';

app.use('/', index);
app.use('/users', users);

export default { app, server };