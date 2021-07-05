import express from 'express';
const router = express.Router();

import indexController from '../controllers/index/index.controller';
import aboutController from '../controllers/index/about.controller';
import contactController from '../controllers/index/contact.controller';
import loginController from '../controllers/index/login.controller';
import registerController from '../controllers/index/register.controller';

import pickTagController from '../controllers/index/pick-tag.controller';
import pickTemplateController from '../controllers/index/pick-template.controller';
import pickDomainController from '../controllers/index/pick-domain.controller'
import pickLogoController from '../controllers/index/pick-logo.controller';

router.get('/', indexController.get);
router.get('/contact', contactController.get);
router.get('/about', aboutController.get);

router.get('/pick-tag', pickTagController.get);
router.post('/pick-tag', pickTagController.post);

router.get('/pick-template', pickTemplateController.get);
router.post('/pick-template', pickTemplateController.post);

router.get('/pick-domain', pickDomainController.get);
router.post('/pick-domain', pickDomainController.post);

router.get('/pick-logo', pickLogoController.get);
router.post('/pick-logo', pickLogoController.post);

router.get('/login', loginController.get);
router.post('/login', loginController.post);

router.get('/register', registerController.get);
router.post('/register', registerController.post);


export default router;