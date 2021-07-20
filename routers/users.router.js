import express from 'express';
const router = express.Router();

import { upload } from '../middleware/upload.middleware';

import accountController from '../controllers/users/orders.controller';
import logoutController from '../controllers/users/logout.controller';
import settingsController from '../controllers/users/settings.controller';
import orderController from '../controllers/users/order.controller';

router.get('/orders', accountController.get);
router.get('/order/:id', orderController.get);
router.get('/settings', settingsController.get);
router.get('/logout', logoutController.get);

export default router;