import express from 'express';
const router = express.Router();

import indexController from '../controllers/index/index.controller';

router.get('/', indexController);

export default router;