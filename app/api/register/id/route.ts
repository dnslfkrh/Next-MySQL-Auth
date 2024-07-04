import { NextResponse } from 'next/server';
import checkIdAvailability from '@/app/_utils/register/id/searchId';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id } = data;

        const isIdAvailable = await checkIdAvailability(id);
        if (!isIdAvailable) {
            return NextResponse.json({ message: '불가' }, { status: 500 });
        }

        return NextResponse.json({ message: '가능' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
};