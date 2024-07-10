import { NextResponse } from 'next/server';
import hashPassword from '@/app/_utils/register/complete/hashPs';
import addNewUser from '@/app/_utils/register/complete/newUser';
import responseUtil from '@/app/_utils/_nextResponse/response';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, email, password } = data;

        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return await responseUtil('비밀번호 해싱 중 문제 발생', 500)
        }

        const registerComplete = await addNewUser(id, email, hashedPassword);
        if (!registerComplete) {
            return await responseUtil('회원 정보 저장 중 문제 발생', 500)
        }

        return await responseUtil('회원 가입 성공', 200)

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}