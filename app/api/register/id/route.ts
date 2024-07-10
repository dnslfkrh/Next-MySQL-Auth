import { VerificationService } from "@/app/_services/auth/services/verification.service";
import Response from "@/app/_utils/ResponseWrapper";
import { NextRequest } from "next/server";

const verificationService = new VerificationService();

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const isIdAvailable = await verificationService.checkIdAvailability(id);
    if (!isIdAvailable) {
      return Response.json("불가", 400);
    }

    return Response.json("가능", 200);
  } catch (error) {
    return Response.json("서버 오류 발생", 500);
  }
}
