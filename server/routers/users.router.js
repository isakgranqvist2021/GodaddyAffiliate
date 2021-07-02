import express from 'express';
const router = express.Router();

import usersController from '../controllers/users/users.controller';

router.get('/', usersController);

export default router;