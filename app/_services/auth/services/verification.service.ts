import database from "@/app/_lib/mysql";
import { RowDataPacket } from "mysql2";

export class VerificationService {
  // 이메일 인증 코드 생성 및 저장
  async createVerificationCode(email: string, code: string): Promise<boolean> {
    try {
      const query = "INSERT INTO logs (email, code) VALUES (?, ?)";
      await database.query(query, [email, code]);

      setTimeout(() => {
        this.deleteVerificationCode(email);
      }, 2 * 60 * 1000);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // 이메일 인증 코드 삭제
  async deleteVerificationCode(email: string): Promise<boolean> {
    try {
      const query = "delete from logs where email = ?";
      await database.query(query, [email]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // 이메일 사용가능 여부 확인
  async checkEmailAvailability(email: string): Promise<boolean> {
    try {
      const query = "SELECT user_id FROM users WHERE email = ?";
      const [isEmailExist] = await database.query(query, [email]);

      if (Array.isArray(isEmailExist) && isEmailExist.length === 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("데이터베이스 조회 중 오류:", error);
      throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
    }
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    try {
      const query = "SELECT * FROM logs WHERE email = ? AND code = ?";
      const values = [email, code];
      const [isLogExist] = await database.execute(query, values);

      if (Array.isArray(isLogExist) && isLogExist.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      return false;
    }
  }

  // 아이디 사용가능 여부 확인
  async checkIdAvailability(id: string): Promise<boolean> {
    try {
      const [isIdExist] = await database.execute<RowDataPacket[]>(
        "SELECT user_id FROM users WHERE user_id = ?",
        [id]
      );
      // const query = 'SELECT user_id FROM users WHERE user_id = ?';
      // const [isIdExist] = await.query(query, [id]);

      if (Array.isArray(isIdExist) && isIdExist.length === 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("데이터베이스 조회 중 오류:", error);
      throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
    }
  }
}
