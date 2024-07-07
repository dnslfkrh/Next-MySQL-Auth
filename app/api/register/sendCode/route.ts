import { NextResponse } from "next/server";
import checkEmailAvailability from "@/app/_utils/register/sendCode/emailCheck";
import createCode from "@/app/_utils/register/sendCode/code";
import sendCode from "@/app/_utils/register/sendCode/nodemailer";
import createLog from "@/app/_utils/register/sendCode/saveLog";
import responseUtil from "@/app/_utils/_nextResponse/response";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { email } = data;

        const isEmailExist = await checkEmailAvailability(email);
        if (!isEmailExist) {
            return await responseUtil('이미 등록된 이메일', 400)
        }

        const code: string = await createCode();
        const isSentSuccessfully = await sendCode(email, code);
        const isLogCreated = await createLog(email, code);

        if (!isSentSuccessfully && !isLogCreated) {
            return await responseUtil('이메일 전송 실패', 500)
        }

        return await responseUtil('성공', 200)

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}