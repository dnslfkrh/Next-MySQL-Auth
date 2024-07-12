import nodemailer from 'nodemailer';
import { createLog } from '../auth/verifications/email.service';

export const sendCode = async (sendCase: number, email: string): Promise<boolean> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_KEY
            }
        });

        let mailOptions;
        let code;

        switch (sendCase) {
            case 1: // 회원가입 인증번호
                code = Math.random().toString(36).substring(2, 8);
                mailOptions = {
                    to: email,
                    subject: 'Verification code',
                    text: `Your verification code is : [${code}]`
                };
                await transporter.sendMail(mailOptions);
                const isLogCreate = await createLog(email, code);
                if (!isLogCreate) {
                    return false;
                }

                break;

            case 2: // ID 찾기
                mailOptions = {
                    to: email,
                    subject: 'Your ID',
                    text: `Your ID is : [${email}]`
                };
                await transporter.sendMail(mailOptions);

                break;

            case 3: // 비밀번호 찾기
            
            
                break;

            default:
                console.error('Invalid sendCase');
                return false;
        }

        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
}