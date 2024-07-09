import database from '@/app/_lib/mysql';
import { RowDataPacket } from 'mysql2';

const checkIdAvailability = async (id: string): Promise<boolean> => {

    try {
        const [isIdExist] = await database.execute<RowDataPacket[]>('SELECT user_id FROM users WHERE user_id = ?', [id]);
        // const query = 'SELECT user_id FROM users WHERE user_id = ?';
        // const [isIdExist] = await.query(query, [id]);

        if (Array.isArray(isIdExist) && isIdExist.length === 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error("데이터베이스 조회 중 오류:", error);
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }
}

export default checkIdAvailability;