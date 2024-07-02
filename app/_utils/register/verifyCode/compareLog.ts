import database from "@/app/_lib/db";

const verifyCode = async (email: string, code: string): Promise<boolean> => {
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
};

export default verifyCode;