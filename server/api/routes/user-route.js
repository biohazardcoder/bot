import express from 'express';
import { ClearUsers,CreateUser,DownloadJsonData,GetAllUsers} from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', GetAllUsers);
router.get("/download", DownloadJsonData); 
router.post('/create', CreateUser);
router.delete('/clear', ClearUsers);

export default router;