import jwt from 'jsonwebtoken';
import { generateRandomString } from '@/app/_utils/string/randomString';

export const createAccessToken = async (id: string): Promise<string | null> => {
  try {
    const payload = {
      id: id,
      type: 'access',
      createdAt: new Date().toISOString()
    };
    const SECRET_KEY = process.env.JWT_ACCESS_SECRET;

    if (!SECRET_KEY) {
      throw new Error('토큰 키 확인 필요');
    }

    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    return accessToken;

  } catch (error) {
    console.error("Error creating access token:", error);
    return null;
  }
}

export const createRefreshToken = async (id: string): Promise<string | null> => {
    try {
      const SECRET_KEY = process.env.JWT_REFRESH_SECRET;
  
      if (!SECRET_KEY) {
        throw new Error('토큰 키 확인 필요');
      }
  
      const code1 = await generateRandomString();
      const code2 = await generateRandomString();
  
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