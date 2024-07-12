import database from '@/app/_lib/mysql';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  user_id: string;
}

export const findId = async (email: string): Promise<string | null> => {
    try {
        const query = 'SELECT user_id FROM users WHERE email = ?';
        const values = [email];
        const [rows] = await database.execute<UserRow[]>(query, values);

        if (rows.length === 0) {
            return null;
        }

        return rows[0].user_id;

    } catch (error) {
        console.error(error);
        return null;
    }
}