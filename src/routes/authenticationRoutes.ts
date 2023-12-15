import express from 'express';
import { login } from '../controllers/authenticationController';
import { signup } from '../controllers/authenticationController';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

export default router;