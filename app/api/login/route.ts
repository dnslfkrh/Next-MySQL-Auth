import { NextResponse } from "next/server";
import checkIdExist from "@/app/_utils/login/id";
import checkPsMatch from "@/app/_utils/login/password";
import responseUtil from "@/app/_utils/_nextResponse/response";
import createAccessToken from "@/app/_utils/login/jwt/accessToken";
import createRefreshToken from "@/app/_utils/login/jwt/refreshToken";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, password } = data;

        const isIdExist = await checkIdExist(id);
        if (!isIdExist) {
            return await responseUtil('실패', 500)
        }

        const isPsMatch = await checkPsMatch(id, password);
        if (!isPsMatch) {
            return await responseUtil('실패', 500)
        }

        const accessToken = await createAccessToken(id);
        console.log(accessToken);
        if (!accessToken) {
            return await responseUtil('토큰 생성 실패', 500)
        }

        const refreshToken = await createRefreshToken(id);
        console.log(refreshToken);
        if (!refreshToken) {
            return await responseUtil('토큰 생성 실패', 500)
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

        // RT 디비 저장
        
        return response;

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}