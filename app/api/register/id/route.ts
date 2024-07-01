import { NextResponse } from 'next/server';
import checkIdAvailability from '../../../_utils/register/id/checkId';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id } = data;
        console.log("받은 아이디:", id);

        const isIdAvailable = await checkIdAvailability(id);

        if (isIdAvailable) {
            console.log('생성 가능');
            return NextResponse.json({ message: '가능' }, { status: 200 });
        } else {
            console.log('생성 불가');
            return NextResponse.json({ message: '불가' }, { status: 200 });
        }
    } catch (error) {
        console.error('Error checking ID:', error);
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}