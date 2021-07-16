import express from 'express';
const router = express.Router();

import ordersController from '../controllers/admin/orders.controller';
import createTemplateController from '../controllers/admin/create-template.controller';
import orderController from '../controllers/admin/order.controller';
import viewTemplatesController from '../controllers/admin/view-templates.controller';

router.get('/orders', ordersController.get);
router.get('/create-template', createTemplateController.get);
router.get('/order/remove-event', orderController.remove);
router.post('/order/add-event', orderController.add);
router.post('/order/mark/completed', orderController.completed);
router.get('/view-templates', viewTemplatesController.get);

export default router;