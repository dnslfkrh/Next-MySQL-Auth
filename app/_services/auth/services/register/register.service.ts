import database from '@/app/_lib/mysql';
import { hashString } from '@/app/_utils/bcrypt/hashing';

export const addNewUser = async (id: string, email: string, password: string): Promise<boolean> => {
    try {
        const hashedPassword = await hashString(password);

        const query = 'INSERT INTO users (user_id, email, password) VALUES (?, ?, ?)';
        await database.query(query, [id, email, hashedPassword]);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}