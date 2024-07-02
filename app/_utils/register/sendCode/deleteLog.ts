import database from '@/app/_lib/db';

const deleteLog = async (email: string) => {
    try {
        const query = 'DELETE FROM logs WHERE email = ?';
        await database.query(query, [email]);
        console.log(email, "로그가 삭제 되었습니다.");
    } catch (error) {
        console.error(error);
    }
}

export default deleteLog;