'use client'

import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
    email: string;
}

const HOME: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFindId = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(formData.email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('/api/find/id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });
            console.log(formData.email);

            if (response.ok) {
                const data = await response.json();
                if (data.message === '전송 완료') {
                    alert('이메일을 확인해 주세요.');
                } else {
                    alert('올바른 이메일을 입력해 주세요.');
                }
            } else {
                alert('오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('이메일 전송 중 에러:', error);
        }
    };

    return (
        <div>
            여기는 아이디 찾기
            <form onSubmit={handleFindId}>
                <div>
                    <label htmlFor="email">가입한 이메일: </label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <button type="submit">아이디 찾기</button>
            </form>
        </div>
    );
}

export default HOME;