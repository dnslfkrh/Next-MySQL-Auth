import type { NextApiRequest, NextApiResponse } from "next";
import checkIdAvailability from '../../../_utils/register/id/checkId';

export async function POST(req: Request, res: NextApiResponse) {

    if (req.method === 'POST') {
        try {
            const data = await req.json();
            const { id } = data;
            console.log("받은 아이디:", id);

            const isAvailable = await checkIdAvailability(id);

            if (isAvailable) {
                console.log('생성 가능');
                res.status(200).json({ message: '가능' });
            } else {
                console.log('생성 불가');
                res.status(404).json({ message: '불가' });
            }
        } catch (error) {
            console.error('Error checking ID:', error);
            res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
