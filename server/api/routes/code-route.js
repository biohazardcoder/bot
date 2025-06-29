import express from 'express';
import { GetAllCodes,CreateCodes,ClearCodes } from '../controllers/code-controller.js';

const router = express.Router();

router.get('/', GetAllCodes);
router.post('/:value', CreateCodes);
router.delete('/clear', ClearCodes);
export default router;