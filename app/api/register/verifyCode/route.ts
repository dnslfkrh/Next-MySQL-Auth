import { EmailService } from "@/app/_services/auth/services/email.service";
import { VerificationService } from "@/app/_services/auth/services/verification.service";
import responseUtil, { Response } from "@/app/_utils/ResponseWrapper";
import { NextRequest } from "next/server";

const verificationService = new VerificationService();

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    const isEmailVerified = await verificationService.verifyCode(email, code);
    if (!isEmailVerified) {
      return Response.json("이메일 검증 실패", 500);
    }

    const isLogDeleted = await verificationService.deleteVerificationCode(
      email
    );
    if (!isLogDeleted) {
      return Response.json("이메일 검증 실패", 500);
    }
    return Response.json("이메일 검증 성공", 200);
  } catch (error) {
    return Response.json("서버 오류 발생", 500);
  }
}
