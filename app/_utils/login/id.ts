import database from '@/app/_lib/mysql';
import { RowDataPacket } from 'mysql2';

const checkIdExist = async (id: string): Promise<boolean> => {

    try {
        const [isUserExist] = await database.execute<RowDataPacket[]>('SELECT user_id FROM users WHERE user_id = ?', [id]);

        if (Array.isArray(isUserExist) && isUserExist.length > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error("데이터베이스 조회 중 오류:", error);
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }
}

export default checkIdExist;