import { NextResponse } from "next/server";
import checkIdExist from "@/app/_utils/login/id";
import checkPsMatch from "@/app/_utils/login/password";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, password } = data;

        const isIdExist = await checkIdExist(id);
        if (!isIdExist) {
            return NextResponse.json({ message: '실패'}, { status: 500 })
        }

        const isPsMatch = await checkPsMatch(id, password);
        if (!isPsMatch) {
            return NextResponse.json({ message: '실패'}, { status: 500 })
        }

        return NextResponse.json({ message: '성공'}, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}