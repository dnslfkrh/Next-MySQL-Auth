import jwt from 'jsonwebtoken'

const createRefreshToken = async (id: string): Promise<string | null> => {
  try {
    const payload = {
      id: id,
      type: 'refresh',
      createdAt: new Date().toISOString()
    };
    const SECRET_KEY = process.env.JWT_REFRESH_SECRET;

    if (!SECRET_KEY) {
      throw new Error('토큰 키 확인 필요');
    }

    const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '30d' });
    return refreshToken;

  } catch (error) {
    console.error("Error creating refresh token:", error);
    return null;
  }
}

export default createRefreshToken;
