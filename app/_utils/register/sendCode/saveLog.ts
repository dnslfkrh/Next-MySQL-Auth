import database from '@/app/_lib/db';
import deleteLog from './deleteLog';

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

export default createLog;