import { NextResponse } from "next/server";
import verifyCode from "@/app/_utils/register/verifyCode/compareLog";
import deleteLog from "@/app/_utils/register/sendCode/deleteLog";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { email, code } = data;

        const isEmailVerified = await verifyCode(email, code);
        if (!isEmailVerified) {
            return NextResponse.json({ message: '이메일 검증 실패' }, { status: 500 });
        }

        // 로그 제거 실패 시 에러?
        const isLogDeleted = await deleteLog(email);
        if (!isLogDeleted) {
            return NextResponse.json({ message: '로그 제거 실패' }, { status: 500 });
        }

        return NextResponse.json({ message: '이메일 검증 성공' }, { status: 200 });
        
        // await deleteLog(email);
        // console.log("이메일 검증 성공");
        // return NextResponse.json({ message: '이메일 검증 성공' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}