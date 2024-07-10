import checkIdExist from "@/app/_utils/login/id";
import checkPsMatch from "@/app/_utils/login/password";
import responseUtil, { Response } from "@/app/_utils/ResponseWrapper";
import createAccessToken from "@/app/_utils/login/jwt/accessToken";
import createRefreshToken from "@/app/_utils/login/jwt/refreshToken";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, password } = await req.json();

    const isIdExist = await checkIdExist(id);
    if (!isIdExist) {
      return Response.json("존재하지 않는 아이디입니다.", 400);
    }

    const isPsMatch = await checkPsMatch(id, password);
    if (!isPsMatch) {
      return Response.json("비밀번호가 일치하지 않습니다.", 400);
    }

    const accessToken = await createAccessToken(id);
    console.log(accessToken);
    if (!accessToken) {
      return Response.json("토큰 생성 실패", 500);
    }

    const refreshToken = await createRefreshToken(id);
    console.log(refreshToken);
    if (!refreshToken) {
      return Response.json("토큰 생성 실패", 500);
    }
    // 디비 저장

    const response = Response.json("로그인 성공", 200);
    response.cookies.set("at", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });

    response.cookies.set("rt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 24 * 14,
      path: "/",
    });

    return response;
  } catch (error) {
    return Response.json("서버 오류 발생", 500);
  }
}
