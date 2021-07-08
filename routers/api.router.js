import express from 'express';
const router = express.Router();

import adminMiddleware from '../middleware/admin.middleware';
import uploadMiddleware from '../middleware/upload.middleware';

import tagsController from '../controllers/api/tags.controller';
import uploadController from '../controllers/api/upload.controller';
import createTemplateController from '../controllers/api/create-template.controller';
import findTemplatesController from '../controllers/api/find-templates.controller';
import searchController from '../controllers/api/search.controller';
import inventoryController from '../controllers/api/inventory.controller';
import phoneController from '../controllers/api/phone.controller';

router.get('/tags', tagsController);
router.get('/find-templates', findTemplatesController);
router.get('/search/:q', searchController.get);
router.get('/my-inventory', inventoryController.get);
router.post('/verify-phone', phoneController.post);
router.put('/verify-phone', phoneController.put);

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