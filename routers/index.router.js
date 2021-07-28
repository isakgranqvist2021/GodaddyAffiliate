import express from 'express';
const router = express.Router();


import { loggedOut } from '../middleware/auth.middleware';

import indexController from '../controllers/index/index.controller';
import loginController from '../controllers/index/login.controller';

import pickTagController from '../controllers/index/pick-tag.controller';
import pickTemplateController from '../controllers/index/pick-template.controller';
import pickDomainController from '../controllers/index/pick-domain.controller'
import checkoutController from '../controllers/index/checkout.controller';
import directionController from '../controllers/index/direction.controller';
import hostingController from '../controllers/index/pick-hosting.controller';
import viewTemplateController from '../controllers/index/view-template';
import hireController from '../controllers/index/hire.controller';

router.get('/', indexController.get);

router.get('/talk-to-an-expert', hireController.get);

router.get('/pick-tag', pickTagController.get);
router.get('/set-tag', pickTagController.set);
router.post('/pick-tag', pickTagController.post);

router.get('/direction', directionController.get);

router.get('/pick-template', pickTemplateController.get);
router.post('/pick-template', pickTemplateController.post);

router.get('/view-template/:id', viewTemplateController.get);

router.get('/pick-domain', pickDomainController.get);
router.post('/pick-domain', pickDomainController.post);

router.get('/checkout', checkoutController.get);

router.get('/pick-hosting', hostingController.get);
router.post('/pick-hosting', hostingController.post);

router.post('/checkout/stripe', checkoutController.pay_stripe);
router.post('/checkout/fedapay', checkoutController.pay_fedapay);

router.get('/checkout-success', checkoutController.success);
router.get('/remove/:index', checkoutController.remove);

router.get('/login', loggedOut, loginController.get);

export default router;