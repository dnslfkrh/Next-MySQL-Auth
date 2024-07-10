import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const createRefreshToken = async (id: string): Promise<string | null> => {
  try {
    const SECRET_KEY = process.env.JWT_REFRESH_SECRET;

    if (!SECRET_KEY) {
      throw new Error('토큰 키 확인 필요');
    }

    const code1 = crypto.randomBytes(16).toString('hex');
    const code2 = crypto.randomBytes(16).toString('hex');

    const payload = {
      forLength1: code1,
      id: id,
      type: 'refresh',
      forLength2: code2,
      createdAt: new Date().toISOString()
    };

    const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' });
    return refreshToken;

  } catch (error) {
    console.error("Error creating refresh token:", error);
    return null;
  }
}

export default createRefreshToken;