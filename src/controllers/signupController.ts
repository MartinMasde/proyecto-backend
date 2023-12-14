// import { findUserByUsername, saveUser } from "../db/Users";
// import bcrypt from 'bcrypt';


// export async function signup(req: Request, res: Response) {
//     const { username, password } = req.body;
//     const existingUser = findUserByUsername(username);

//     if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//     }
//     const saltRounds = 10;
//     bcrypt.hash(password, saltRounds, (err, hash) => {
//         if (err) {
//             return res.status(500).json({ message: 'Internal server error' });
//         }

//         saveUser(username, hash);
//         return res.status(201).json({ message: 'User registered successfully' });
//     } );
// }