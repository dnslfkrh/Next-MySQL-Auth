import { NextResponse } from 'next/server';
import hashPassword from '@/app/_utils/register/complete/hashPs';
import addNewUser from '@/app/_utils/register/complete/newUser';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, email, password } = data;

        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            return NextResponse.json({ error: '비밀번호 해싱 중 문제 발생' }, { status: 500 });
        }

        const registerComplete = await addNewUser(id, email, hashedPassword);

        if (!registerComplete) {
            return NextResponse.json({ error: '회원 정보 저장 중 문제 발생' }, { status: 500 });
        }

        return NextResponse.json({ error: '회원 가입 성공' }, { status: 200 });

    } catch (error) {
        console.error('Error checking ID:', error);
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
};