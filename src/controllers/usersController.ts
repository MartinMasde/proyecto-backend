import  User  from '../models/userModel';

const users: any = [
    {
        id: 1,
        username: 'admin',
        password: '$2b$10$g3m8XrZpY9Fh7QY5s1NkUeJk7l9kZjzJ7Jr4K0l8y8JwXy2nZl1kK'
    }
];

export const findUserByUsername = (username: string): any | undefined => {
    const result = users.find((user:any) => user?.username === username);
    return result;
};

export const saveUser = (username: string, password: string): void => {
    const newUserId = users.length + 1;
    const newUser: any = {
        id: newUserId,
        username,
        password
    };
    users.push(newUser);
};