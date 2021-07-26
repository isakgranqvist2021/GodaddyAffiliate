import express from 'express';
const router = express.Router();

import { isAdmin_v2 } from '../middleware/admin.middleware';
import { upload } from '../middleware/upload.middleware';

import tagsController from '../controllers/api/tags.controller';
import uploadController from '../controllers/api/upload.controller';
import createTemplateController from '../controllers/api/create-template.controller';
import findTemplatesController from '../controllers/api/find-templates.controller';
import searchController from '../controllers/api/search.controller';
import phoneController from '../controllers/api/phone.controller';
import loginController from '../controllers/api/login.controller';
import codesController from '../controllers/api/codes.controller';
import emailController from '../controllers/api/email.controller';
import findTemplateController from '../controllers/api/find-template.controller';
import updateTemplateController from '../controllers/api/update-template.controller';
import currenciesController from '../controllers/api/currencies.controller';
import fileController from '../controllers/api/file.controller';
import meetingController from '../controllers/api/meeting.controller';

router.get('/tags', tagsController);
router.get('/find-templates', findTemplatesController);
router.get('/search/:q', searchController.get);

router.post('/verify-phone', phoneController.post);
router.post('/verify-email', emailController.post);
router.post('/login/phone', loginController.phone);
router.post('/login/email', loginController.email);

router.get('/codes', codesController.get);

router.get('/get-template/:id', isAdmin_v2, findTemplateController.get);
router.put('/update-template', isAdmin_v2, updateTemplateController);

router.post('/upload', isAdmin_v2, upload, uploadController.upload);

router.post('/upload-file', upload, uploadController.post);
router.post('/add-file', fileController.post);
router.get('/order-files/:order', fileController.get);
router.post('/remove-file', fileController.remove);

router.post('/create-template', isAdmin_v2, createTemplateController);
router.get('/currencies', currenciesController.get);
router.get('/set-currency/:code', currenciesController.set);

router.post('/create-meeting', meetingController.create)

export default router;