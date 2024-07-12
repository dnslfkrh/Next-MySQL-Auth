import { NextResponse } from 'next/server';
import { checkIdExist } from '@/app/_services/auth/verifications/id.service';
import responseUtil from '@/app/_utils/response/response';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id } = data;

        const isIdAvailable = await checkIdExist(id);
        if (!isIdAvailable) {
            return await responseUtil('불가', 200)
        }

        return await responseUtil('가능', 200)

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}