import { NextResponse } from 'next/server';
import checkIdAvailability from '@/app/_utils/register/id/searchId';
import responseUtil from '@/app/_utils/_nextResponse/response';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id } = data;

        const isIdAvailable = await checkIdAvailability(id);
        if (!isIdAvailable) {
            return await responseUtil('불가', 500)
        }

        return await responseUtil('가능', 200)

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}