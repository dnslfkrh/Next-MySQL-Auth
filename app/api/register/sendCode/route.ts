import { NextResponse } from "next/server";
import createCode from "@/app/_utils/register/sendCode/code";
import sendCode from "@/app/_utils/register/sendCode/nodemailer";
import createLog from "@/app/_utils/register/sendCode/saveLog";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { email } = data;


        const code: string = await createCode();
        
        const isSentSuccessfully = await sendCode(email, code);

        if (isSentSuccessfully) {
            
            const isLogCreated = await createLog(email, code);

            if(isLogCreated) {
                return NextResponse.json({ message: '전송 성공' }, { status: 200 });
            } else {
                return NextResponse.json({ message: '전송 실패' }, { status: 500 });
            }
        } else {
            return NextResponse.json({ message: '서버 오류' }, { status: 500 });
        }

    } catch (error) {
        console.error('Error sending EMAIL:', error);
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
};

