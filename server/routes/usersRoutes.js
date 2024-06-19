import express from 'express';
import { registerNewUser } from '../controllers/usersController.js';

const router = express.Router();

router.post('/register', registerNewUser);

export default router;
