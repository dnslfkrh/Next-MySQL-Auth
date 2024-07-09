import jwt from 'jsonwebtoken';

const createAccessToken = async (id: string): Promise<string | null> => {
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

export default createAccessToken;
