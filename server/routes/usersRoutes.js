import express from 'express';
import {
  registerNewUser,
  userLogin,
  getUserProfile,
} from '../controllers/usersController.js';
import JWTAuth from '../middlewares/JWTAuth.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', userLogin);
router.get('/profile', JWTAuth, getUserProfile);

export default router;
