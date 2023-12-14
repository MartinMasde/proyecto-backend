import { Request, Response } from 'express';
import { findUserByUsername } from "../db/Users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function login(req: Request, res: Response) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
   }
    if (secretKey) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
        const token = jwt.sign({ username: user.username }, secretKey, { 
            expiresIn: '1h' 
        });
        return res.status(200).json({ token });
        } 
    } 
    return res.status(401).json({ 
        message: 'Authentication failed, user and password must match...' });
}
