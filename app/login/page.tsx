'use client'

import { useState } from "react";

interface FormData {
    id: string;
    password: string;
}

const HOME: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.id || !formData.password) {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: formData.id,
                    password: formData.password
                })
            });

            if (response.ok) {
                alert("로그인 성공");
            } else {
                alert("아이디 또는 비밀번호를 확인해 주세요.");
            }
        } catch (error) {
            alert("오류 발생");
        }
    }

    return (
        <div className="loginForm">
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="id">ID: </label>
                    <input type="text" name="id" value={formData.id} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">PASSWORD: </label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default HOME;