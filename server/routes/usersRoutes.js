import express from 'express';
import {
  registerNewUser,
  userLogin,
  getUserProfile,
  updateProfile,
} from '../controllers/usersController.js';
import JWTAuth from '../middlewares/JWTAuth.js';
import { multerUpload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', userLogin);
router.post('/updateprofile', multerUpload.single('avatar'), updateProfile);
router.get('/profile', JWTAuth, getUserProfile);

export default router;
