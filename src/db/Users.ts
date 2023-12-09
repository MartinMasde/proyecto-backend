import { User } from '../models/User';

const users: User[] = [
    {
        id: 1,
        username: 'admin',
        password: '$2b$10$g3m8XrZpY9Fh7QY5s1NkUeJk7l9kZjzJ7Jr4K0l8y8JwXy2nZl1kK'
    }
];

export const findUserByUsername = (username: string): User | undefined => {
    const result = users.find((user) => user?.username === username);
    return result;
};

export const saveUser = (username: string, password: string): void => {
    const newUserId = users.length + 1;
    const newUser: User = {
        id: newUserId,
        username,
        password
    };
    users.push(newUser);
};
