import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  User  from "../models/userModel";


// FUNCION PARA CREAR UN USUARIO
export async function signup(req: any, res: any) {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({email: email});
  
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        const data = new User({
                name,
                password: hash, 
                email,
          });
          
        const dataToSave = await data.save();
        if (dataToSave){
            return res.status(201).json({ message: 'User registered successfully' });
        }
        res.status(500).json({message: "No se puede conectar al servidor"});
    } );
}

// FUNCION PARA LOGUEAR UN USUARIO
export async function login(req: Request, res: Response) {
    const secretKey = process.env.JWT_SECRET_KEY;
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
     }
      if (secretKey) {
          const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (isPasswordCorrect) {
          const token = jwt.sign({ username: user.email }, secretKey, { 
              expiresIn: '1h' 
          });
          return res.status(200).json({ token });
          } 
      } 
      return res.status(401).json({ 
          message: 'Authentication failed, user and password must match...' });
  }