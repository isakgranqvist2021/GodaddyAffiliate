import express from 'express';
const router = express.Router();

import adminMiddleware from '../middleware/admin.middleware';
import uploadMiddleware from '../middleware/upload.middleware';

import tagsController from '../controllers/api/tags.controller';
import uploadController from '../controllers/api/upload.controller';
import createTemplateController from '../controllers/api/create-template.controller';
import findTemplatesController from '../controllers/api/find-templates.controller';

router.get('/tags', tagsController);
router.get('/find-templates', findTemplatesController)

router.post(
    '/upload',
    adminMiddleware.apiProtection,
    uploadMiddleware.array('file', 10),
    uploadController
);

router.post(
    '/create-template',
    adminMiddleware.apiProtection,
    createTemplateController
);

export default router;