import bcrypt from 'bcryptjs';
import database from '@/app/_lib/db';

const checkPsMatch = async (id: string, password: string): Promise<boolean> => {
    try {
        const query = 'SELECT password FROM users WHERE user_id = ?';
        const [savedPassword] = await database.query(query, [id]);
        console.log(id, savedPassword);
        // 비밀번호까지 잘 뽑는다


        return false;
    } catch (error) {
        console.error("데이터베이스 조회 중 오류:", error);
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }
}

export default checkPsMatch;
