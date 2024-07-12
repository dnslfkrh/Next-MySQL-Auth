import { NextResponse } from 'next/server';
import { addNewUser } from '@/app/_services/auth/services/register/register.service';
import responseUtil from '@/app/_utils/response/response';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, email, password } = data;

        const registerComplete = await addNewUser(id, email, password);
        if (!registerComplete) {
            return await responseUtil('회원 정보 저장 중 문제 발생', 500)
        }

        return await responseUtil('회원 가입 성공', 200)

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}