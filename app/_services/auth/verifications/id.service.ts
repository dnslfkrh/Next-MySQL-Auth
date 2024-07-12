// 아이디 유효성

// 회원가입 시 사용 가능 확인 가능

// 로그인 시 회원 정보 존재하는지 확인 가능

import database from '@/app/_lib/mysql';
import { RowDataPacket } from 'mysql2';

export const checkIdExist = async (id: string): Promise<boolean> => {

    try {
        const [isIdExist] = await database.execute<RowDataPacket[]>('SELECT user_id FROM users WHERE user_id = ?', [id]);

        console.log(isIdExist);
        if (Array.isArray(isIdExist) && isIdExist.length === 0) { // 해당하는 아이디가 없으면?
            return true; // true : 회원가입 가능 || 로그인할 때 true면 회원 존재하지 않음
        } else {
            return false; // 로그인할 때는 false면 로그인 가능
        }

    } catch (error) {
        console.error("데이터베이스 조회 중 오류:", error);
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }
}