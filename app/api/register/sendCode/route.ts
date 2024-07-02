import { NextResponse } from "next/server";
import checkEmailAvailability from "@/app/_utils/register/sendCode/emailCheck";
import createCode from "@/app/_utils/register/sendCode/code";
import sendCode from "@/app/_utils/register/sendCode/nodemailer";
import createLog from "@/app/_utils/register/sendCode/saveLog";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { email } = data;

        const isEmailExist = await checkEmailAvailability(email);

        if (!isEmailExist) {
            return NextResponse.json({ message: '이미 등록된 이메일입니다.' }, { status: 400 });
        }

        const code: string = await createCode();
        const isSentSuccessfully = await sendCode(email, code);

        if (!isSentSuccessfully) {
            return NextResponse.json({ message: '이메일 전송 실패' }, { status: 500 });
        }

        const isLogCreated = await createLog(email, code);

        if (isLogCreated) {
            return NextResponse.json({ message: '성공' }, { status: 200 });
        } else {
            return NextResponse.json({ message: '실패' }, { status: 500 });
        }

    } catch (error) {
        console.error('Error sending EMAIL:', error);
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}