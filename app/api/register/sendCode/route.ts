import { EmailService } from "@/app/_services/auth/services/email.service";
import { VerificationService } from "@/app/_services/auth/services/verification.service";
import Response from "@/app/_utils/ResponseWrapper";
import { NextRequest } from "next/server";

const verificationService = new VerificationService();
const emailService = new EmailService();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const isEmailExist = await verificationService.checkEmailAvailability(
      email
    );
    if (!isEmailExist) {
      return Response.json("이미 존재하는 이메일입니다.", 400);
    }

    const isSentSuccessfully = await emailService.sendTemplateEmail(
      "REGISTER",
      email,
      {
        code: Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0"),
      }
    );

    if (!isSentSuccessfully) {
      return Response.json("이메일 전송 실패", 500);
    }

    return Response.json();
  } catch (error) {
    return Response.json("알 수 없는 오류가 발생했습니다.", 500);
  }
}
