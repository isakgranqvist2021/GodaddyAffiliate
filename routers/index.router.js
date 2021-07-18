import express from 'express';
const router = express.Router();


import { loggedOut } from '../middleware/auth.middleware';

import indexController from '../controllers/index/index.controller';
import loginController from '../controllers/index/login.controller';

import pickTagController from '../controllers/index/pick-tag.controller';
import pickTemplateController from '../controllers/index/pick-template.controller';
import pickDomainController from '../controllers/index/pick-domain.controller'
import checkoutController from '../controllers/index/checkout.controller';

import viewTemplateController from '../controllers/index/view-template';

router.get('/', indexController.get);

router.get('/pick-tag', pickTagController.get);
router.get('/set-tag', pickTagController.set);
router.post('/pick-tag', pickTagController.post);

router.get('/pick-template', pickTemplateController.get);
router.post('/pick-template', pickTemplateController.post);

router.get('/view-template/:id', viewTemplateController.get);

router.get('/pick-domain', pickDomainController.get);
router.post('/pick-domain', pickDomainController.post);

router.get('/checkout', checkoutController.get);
router.post('/checkout', checkoutController.post);
router.get('/checkout-success', checkoutController.success);

router.get('/login', loggedOut, loginController.get);

export default router;