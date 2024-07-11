import { NextResponse } from "next/server";

import responseUtil from "@/app/_utils/_nextResponse/response";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        console.log(email);

        // 이제 디비 조회

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}