import jwt from 'jsonwebtoken';

const createToken = async (id: string): Promise<string | null> => {
  try {
    const payload = { id };
    const SECRET_KEY = process.env.JWT_SECRET;

    if (!SECRET_KEY) {
      throw new Error('토큰 키 확인 필요');
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return token;

  } catch (error) {
    console.error("Error creating token:", error);
    return null;
  }
}

export default createToken;