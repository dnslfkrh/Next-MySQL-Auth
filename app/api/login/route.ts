import { NextResponse } from "next/server";
import checkIdExist from "@/app/_utils/login/id";
import checkPsMatch from "@/app/_utils/login/password";
import responseUtil from "@/app/_utils/_nextResponse/response";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, password } = data;

        const isIdExist = await checkIdExist(id);
        if (!isIdExist) {
            return await responseUtil('실패', 500)
        }

        const isPsMatch = await checkPsMatch(id, password);
        if (!isPsMatch) {
            return await responseUtil('실패', 500)
        }

        return await responseUtil('성공', 200)


    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}