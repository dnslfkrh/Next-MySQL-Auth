// api 라우터
import { NextResponse } from "next/server";
import createCode from "@/app/_utils/register/sendCode/code";
import sendCode from "@/app/_utils/register/sendCode/nodemailer";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { email } = data;

        // 코드 생성
        const code: string = await createCode();
        console.log(code);

        // 이메일 전송
        const isSentSuccessfully = await sendCode(email, code);

        if(isSentSuccessfully) {
            console.log("전송 완료");
            return NextResponse.json({ message: '전송 성공' }, { status: 200 });
        } else {
            console.log("전송 완료");
            return NextResponse.json({ message: '전송 실패' }, { status: 500 });
        }

    } catch (error) {
        console.error('Error sending EMAIL:', error);
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
};

