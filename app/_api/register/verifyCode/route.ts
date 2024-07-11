import { NextResponse } from "next/server";
import verifyCode from "@/app/_utils/register/verifyCode/compareLog";
import deleteLog from "@/app/_utils/register/sendCode/deleteLog";
import responseUtil from "@/app/_/_nextResponse/response";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { email, code } = data;

        const isEmailVerified = await verifyCode(email, code);
        if (!isEmailVerified) {
            return await responseUtil('이메일 검증 실패', 500);
        }

        const isLogDeleted = await deleteLog(email);
        if (!isLogDeleted) {
            return await responseUtil('이메일 검증 실패', 500);
        }
        return await responseUtil('이메일 검증 성공', 200);

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500);
    }
}