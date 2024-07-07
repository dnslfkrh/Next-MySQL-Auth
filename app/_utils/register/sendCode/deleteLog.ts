import database from '@/app/_lib/db';

const deleteLog = async (email: string): Promise<boolean> => {
    try {
        const query = 'delete from logs where email = ?';
        await database.query(query, [email]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default deleteLog;