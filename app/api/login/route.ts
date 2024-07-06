import { NextResponse } from "next/server";
import checkIdExist from "@/app/_utils/login/id";
import checkPsMatch from "@/app/_utils/login/password";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { id, password } = data;

        // 아이디 있는지 검색
        const isIdExist = await checkIdExist(id);
        if (!isIdExist) {
            return NextResponse.json({ message: '실패'}, { status: 500 })
        }
        console.log(isIdExist);
        // 비밀번호 검사
        // 비밀번호 틀리면 실패
        const isPsMatch = await checkPsMatch(id, password);

        // 성공
        
    } catch (error) {
        return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}