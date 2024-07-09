import bcrypt from 'bcryptjs';
import database from '@/app/_lib/mysql';
import { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
    password: string;
}

const checkPsMatch = async (id: string, loginPassword: string): Promise<boolean> => {
    try {
        const query = 'SELECT password FROM users WHERE user_id = ?';
        const [rows] = await database.query<User[]>(query, [id]);

        if (rows.length === 0) {
            return false;
        }

        const savedPassword = rows[0].password;

        const isMatch = await bcrypt.compare(loginPassword, savedPassword);
        if (!isMatch) {
            return false;
        } else {
            return true;
        }
        
    } catch (error) {
        console.error("데이터베이스 조회 중 오류:", error);
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }
}

export default checkPsMatch;