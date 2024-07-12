import responseUtil from "@/app/_utils/response/response";
import { checkIdExist } from "@/app/_services/auth/verifications/id.service";
import { checkPsMatch } from "@/app/_services/auth/services/login/login.service";
import {
    createAccessToken,
    createRefreshToken,
    saveRefreshToken 
} from "@/app/_services/auth/services/token/token.service";
import { hashString } from "@/app/_utils/bcrypt/hashing";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, password } = data;

        const isIdExist = await checkIdExist(id);
        if (isIdExist) {
            return await responseUtil('실패', 500)
        }

        const isPsMatch = await checkPsMatch(id, password);
        if (!isPsMatch) {
            return await responseUtil('실패', 500)
        }

        const accessToken = await createAccessToken(id);
        if (!accessToken) {
            return await responseUtil('토큰 생성 실패', 500)
        }

        const refreshToken = await createRefreshToken(id);
        if (!refreshToken) {
            return await responseUtil('토큰 생성 실패', 500)
        }

        const hashedRT = await hashString(refreshToken);

        const isRefreshTokenSaved = await saveRefreshToken(id, hashedRT);
        if (!isRefreshTokenSaved) {
            return await responseUtil('refresh token 저장 실패', 500)
        }

        const response = await responseUtil('토큰 생성 성공', 200);
        response.cookies.set('at', accessToken, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600, 
            path: '/' 
        });
    
        response.cookies.set('rt', refreshToken, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600 * 24 * 14,
            path: '/' 
        });
        
        return response;

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}