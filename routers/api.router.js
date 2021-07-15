import express from 'express';
const router = express.Router();

import { isAdmin_v2 } from '../middleware/admin.middleware';
import { upload } from '../middleware/upload.middleware';

import tagsController from '../controllers/api/tags.controller';
import uploadController from '../controllers/api/upload.controller';
import createTemplateController from '../controllers/api/create-template.controller';
import findTemplatesController from '../controllers/api/find-templates.controller';
import searchController from '../controllers/api/search.controller';
import inventoryController from '../controllers/api/inventory.controller';
import phoneController from '../controllers/api/phone.controller';
import loginController from '../controllers/api/login.controller';
import codesController from '../controllers/api/codes.controller';
import emailController from '../controllers/api/email.controller';

router.get('/tags', tagsController);
router.get('/find-templates', findTemplatesController);
router.get('/search/:q', searchController.get);
router.get('/my-inventory', inventoryController.get);

router.post('/verify-phone', phoneController.post);
router.post('/verify-email', emailController.post);
router.post('/login/phone', loginController.phone);
router.post('/login/email', loginController.email);

router.get('/codes', codesController.get);

router.post('/upload', isAdmin_v2, upload.array('file', 10), uploadController);
router.post('/create-template', isAdmin_v2, createTemplateController);

export default router;