import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { login } from '../controllers/loginController';
// import { signup } from '../controllers/signupController';


const router = express.Router();

router.post('/login', login);
// router.post('/signup', signup);


export default router;