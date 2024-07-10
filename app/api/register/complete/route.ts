import hashPassword from "@/app/_utils/register/complete/hashPs";
import addNewUser from "@/app/_utils/register/complete/newUser";
import responseUtil, { Response } from "@/app/_utils/ResponseWrapper";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, email, password } = await req.json();

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      return Response.json("비밀번호 암호화 중 문제 발생", 500);
    }

    const registerComplete = await addNewUser(id, email, hashedPassword);
    if (!registerComplete) {
      return Response.json("회원 정보 저장 중 문제 발생", 500);
    }

    return Response.json("회원 가입 성공", 200);
  } catch (error) {
    return Response.json("서버 오류 발생", 500);
  }
}
