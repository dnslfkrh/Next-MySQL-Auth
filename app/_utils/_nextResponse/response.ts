import { NextResponse } from 'next/server';

// export const successfulResponse = (message: string) => {
//     return NextResponse.json({ message }, { status: 200 });
// };

// export const failedResponse = (message: string) => {
//     return NextResponse.json({ message }, { status: 500 });
// };

export const responseUtil = (message: string, status: number) => {
    return NextResponse.json({ message }, { status })
};

export default responseUtil;