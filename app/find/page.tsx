'use client'

import { useState } from "react";

// interface FormData {
//     id: string;
//     password: string;
// }

const handleFindId = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('아이디 찾기');
    window.location.href = '/find/id'
}

const handleFindPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('비밀번호 찾기');
    window.location.href = '/find/id'
}

const HOME: React.FC = () => {
    
    return (
        <div>
            <button type="button" onClick={handleFindId} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                Find My ID
            </button>
            <button type="button" onClick={handleFindPassword} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                Fnd My Password
            </button>
        </div>
    );
}

export default HOME;