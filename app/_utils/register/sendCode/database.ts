import database from '@/app/_lib/db';
import { RowDataPacket } from 'mysql2';

const createLog = async (email: string, code: string): Promise<boolean> => {
    try {
        const query = 'INSERT INTO logs (email, code) VALUES (?, ?)';
        await database.query(query, [email, code]);

        setTimeout(() => {
            deleteLog(email);
        }, 2 * 60 * 1000);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const deleteLog = async (email: string) => {
    try {
        const query = 'DELETE FROM logs WHERE email = ?';
        await database.query(query, [email]);
    } catch (error) {
        console.error(error);
    }
}

// 이제, 검증 후에도 deleteLog 호출해서 삭제하면 된다

export { createLog };
export { deleteLog };