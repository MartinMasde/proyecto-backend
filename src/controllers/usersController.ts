// import { Request, Response } from 'express';

// // Importa tu modelo de usuario y la lista de usuarios aquí
// import { User, users } from '../db/Users';

// export async function findUserByUsername (req: Request, res: Response) {
//     try {
//         const { username } = req.params;
    
//         // Busca el usuario por nombre de usuario
//         const user = users.find((user) => user.username === username);
    
//         // Si el usuario no existe, envía un error
//         if (!user) {
//         return res.status(404).json({ error: 'Usuario no encontrado' });
//         }
    
//         // Si el usuario existe, envía el usuario
//         res.json(user);
//     } catch (error) {
//         console.error('Error al buscar el usuario:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
//     };

// export async function saveUser (req: Request, res: Response) {
//   try {
//     const { username, password } = req.body;

//     // Validar que se proporcionen el nombre de usuario y la contraseña
//     if (!username || !password) {
//       return res.status(400).json({ error: 'Se requieren nombre de usuario y contraseña' });
//     }

//     // Crea un nuevo ID para el usuario
//     const newUserId = users.length + 1;

//     // Crea un nuevo objeto de usuario
//     const newUser: User = { id: newUserId, username, password };

//     // Agrega el nuevo usuario a la lista
//     users.push(newUser);

//     // Puedes enviar una respuesta exitosa si es necesario
//     res.status(201).json({ message: 'Usuario creado exitosamente' });
//   } catch (error) {
//     console.error('Error al guardar el usuario:', error);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// };
