import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, email, password } = data;
        

        // if (isIdAvailable) {
        //     console.log('가입 성공');
        //     return NextResponse.json({ message: '성공' }, { status: 200 });
        // } else {
        //     console.log('가입 실패');
        //     return NextResponse.json({ message: '실패' }, { status: 200 });
        // }
    } catch (error) {
        console.error('Error checking ID:', error);
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
};