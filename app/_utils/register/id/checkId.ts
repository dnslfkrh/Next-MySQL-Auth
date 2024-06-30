import pool from '../../../_lib/db'; 
import { RowDataPacket } from 'mysql2';

const checkIdAvailability = async (id: string): Promise<boolean> => {
    console.log("디비 파일로 이동 성공", id);

    try {
        const [rows] = await pool.execute<RowDataPacket[]>('SELECT user_id FROM users WHERE user_id = ?', [id]);

        console.log("데이터베이스에서 조회된 결과:", rows);

        if (Array.isArray(rows) && rows.length === 0) {
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