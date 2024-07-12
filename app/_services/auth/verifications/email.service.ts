import database from '@/app/_lib/mysql';
import { RowDataPacket } from 'mysql2';

export const checkEmailAvailability = async (email: string): Promise<boolean> => {

    try {
        const [isEmailExist] = await database.execute<RowDataPacket[]>('SELECT user_id FROM users WHERE email = ?', [email]);

        if (Array.isArray(isEmailExist) && isEmailExist.length === 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error("데이터베이스 조회 중 오류:", error);
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }
}

export const createLog = async (email: string, code: string): Promise<boolean> => {
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

export const verifyCode = async (email: string, code: string): Promise<boolean> => {
    try {
        const query = 'SELECT * FROM logs WHERE email = ? AND code = ?';
        const values = [email, code];
        const [isLogExist] = await database.execute(query, values);

        if (Array.isArray(isLogExist) && isLogExist.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error verifying code:', error);
        return false;
    }
}

export const deleteLog = async (email: string): Promise<boolean> => {
    try {
        const query = 'delete from logs where email = ?';
        await database.query(query, [email]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}