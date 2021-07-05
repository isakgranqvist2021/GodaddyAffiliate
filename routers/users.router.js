import express from 'express';
const router = express.Router();

import accountController from '../controllers/users/account.controller';
import logoutController from '../controllers/users/logout.controller';

router.get('/account', accountController.get);
router.get('/logout', logoutController.get);

export default router;