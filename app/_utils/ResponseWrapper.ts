import { NextResponse } from "next/server";

export class Response {
  static json(
    message: string = "요청을 성공적으로 처리했습니다.",
    status: number = 200,
    data?: object
  ): NextResponse {
    return NextResponse.json(
      {
        data,
        message,
      },
      {
        status,
      }
    );
  }
}

export default Response;
