import { EMAIL_KEY, EMAIL_USER } from "@/app/_lib/config";
import nodemailer from "nodemailer";
import {
  EMAIL_SEND,
  EMAIL_SEND_SUBJECT,
  EmailServiceInterface,
} from "../interface/email.interface";
import { VerificationService } from "./verification.service";

export class EmailService implements EmailServiceInterface {
  private transporter: nodemailer.Transporter;
  private verificationService: VerificationService;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_KEY,
      },
    });
    this.verificationService = new VerificationService();
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        to,
        subject,
        text,
      });
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }

  async sendTemplateEmail<T extends keyof EMAIL_SEND>(
    type: T,
    to: string,
    params: EMAIL_SEND[T]
  ) {
    try {
      switch (type) {
        case "REGISTER":
          const { code } = params as EMAIL_SEND["REGISTER"];
          await this.transporter.sendMail({
            to,
            subject: EMAIL_SEND_SUBJECT[type],
            text: `Your verification code is : [${code}]`,
          });
          const isLogCreate =
            await this.verificationService.createVerificationCode(to, code);
          if (!isLogCreate) {
            return false;
          }

          break;

        case "FIND_ID":
          const { email } = params as EMAIL_SEND["FIND_ID"];

          await this.transporter.sendMail({
            to,
            subject: EMAIL_SEND_SUBJECT[type],
            text: `Your ID is : [${email}]`,
          });

          break;

        case "FIND_PW":
          break;

        default:
          console.error("Invalid sendCase");
          return false;
      }

      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  }
}
