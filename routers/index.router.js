import express from 'express';
const router = express.Router();

import indexController from '../controllers/index/index.controller';
import pickTemplateController from '../controllers/index/pick-template.controller.js';

router.get('/', indexController);
router.get('/pick-template', pickTemplateController);

export default router;