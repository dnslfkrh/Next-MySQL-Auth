import { NextResponse } from 'next/server';

export const responseUtil = (message: string, status: number) => {
    return NextResponse.json({ message }, { status })
};

export default responseUtil;