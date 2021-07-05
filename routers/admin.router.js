import express from 'express';
const router = express.Router();

import homeController from '../controllers/admin/home.controller';
import createTemplateController from '../controllers/admin/create-template.controller';

router.get('/home', homeController.get);
router.get('/create-template', createTemplateController.get);

export default router;