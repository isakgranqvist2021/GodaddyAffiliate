import express from 'express';
const router = express.Router();

import indexController from '../controllers/index/index.controller';
import pickTemplateController from '../controllers/index/pick-template.controller';
import loginController from '../controllers/index/login.controller';
import registerController from '../controllers/index/register.controller';

router.get('/', indexController);
router.get('/pick-template', pickTemplateController);
router.get('/login', loginController.get);
router.post('/login', loginController.post);
router.get('/register', registerController.get);
router.post('/reigster', registerController.post);

export default router;