import { NextApiRequest, NextApiResponse } from "next";
import checkIdAvailability from '../../../_utils/register/id/checkId';

// 아니 req.body
export async function POST(req: NextApiRequest, response: NextApiResponse) {
    
    try {
        console.log(req.body);
        const id = req.body.data;
        console.log("받은 아이디:", id);

        const isAvailable = await checkIdAvailability(id);

        if (isAvailable) {
            console.log('생성 가능');
            response.status(200).json({ message: '가능' });
        } else {
            console.log('생성 불가');
            response.status(404).json({ message: '불가' });
        }
    } catch (error) {
        console.error('Error checking ID:', error);
        response.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
};