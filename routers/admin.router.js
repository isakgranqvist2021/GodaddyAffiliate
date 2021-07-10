import express from 'express';
const router = express.Router();

import homeController from '../controllers/admin/home.controller';
import createTemplateController from '../controllers/admin/create-template.controller';
import orderController from '../controllers/admin/order.controller';

router.get('/home', homeController.get);
router.get('/create-template', createTemplateController.get);
router.get('/order/remove-event', orderController.remove);
router.post('/order/add-event', orderController.add);
router.post('/order/mark/completed', orderController.completed);

export default router;