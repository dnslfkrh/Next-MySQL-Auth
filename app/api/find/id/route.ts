import { NextResponse } from "next/server";

import responseUtil from "@/app/_utils/response/response";
import { findId } from "@/app/_services/auth/services/find/find.service";
import { sendEmail } from "@/app/_services/_email/email.service";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        console.log(email);

        // 이제 디비 조회
        const isEmailValid = await findId(email);
        if (isEmailValid == null) {
            return await responseUtil('실패', 200);
        }

        const sendId = await sendEmail(2, email, isEmailValid);
        if (!sendId) {
            return await responseUtil('실패', 500);
        }

        return await responseUtil('전송 완료', 200);

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}