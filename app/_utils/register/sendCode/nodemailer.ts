import nodemailer from 'nodemailer';

const sendCode = async (email: string, code: string): Promise<boolean> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_KEY
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Your verification code',
            text: `Here is [${code}]`
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Failed to send email:', error);
        return false;
    }
};

export default sendCode;
