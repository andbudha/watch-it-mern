import express from 'express';
import { registerNewUser, userLogin } from '../controllers/usersController.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', userLogin);

export default router;
