import bcrypt from 'bcryptjs';

export const hashString = async (string: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedString = await bcrypt.hash(string, salt);
    return hashedString;
}