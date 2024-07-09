import nodemailer from 'nodemailer';
import createLog from '../_utils/register/sendCode/saveLog';

const sendCode = async (sendCase: number, email: string): Promise<boolean> => {
    try {
        if (sendCase == 1) {
            const code = await Math.random().toString(36).substring(2, 8);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_KEY
                }
            });
    
            const mailOptions = {
                to: email,
                subject: 'Verification code',
                text: `Your verification code is : [${code}]`
            };

            await transporter.sendMail(mailOptions);

            const isLogCreate = await createLog(email, code);
            if (!isLogCreate) {
                return false;
            }

            return true;
        } 
        
        // ID 찾을 때
        else if (sendCase == 2) {
            // 이메일로 아이디 가져와야지
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_KEY
                }
            });
    
            const mailOptions = {
                to: email,
                subject: 'Your ID',
                text: `Your ID is : [${email}]`
            };

            await transporter.sendMail(mailOptions);
        } 
        
        // 비밀번호 찾을 때 (case 3)
        else {
            // 비밀번호 바꿔오고 일단
        }

        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
};

export default sendCode;
