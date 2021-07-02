import express from 'express';
const router = express.Router();

import apiController from '../controllers/api/api.controller';

router.get('/', apiController);

export default router;