import database from '@/app/_lib/mysql';

const addNewUser = async (id: string, email: string, password: string): Promise<boolean> => {
    try {
        const query = 'INSERT INTO users (user_id, email, password) VALUES (?, ?, ?)';
        await database.query(query, [id, email, password]);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default addNewUser;