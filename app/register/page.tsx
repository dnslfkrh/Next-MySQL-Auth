'use client'
import React, { useState } from 'react';

interface FormData {
    id: string;
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}

export default function HOME() {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        email: '',
        code: '',
        password: '',
        confirmPassword: ''
    });

    const [isIdChecked, setIsIdChecked] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password') {
            setIsPasswordValid(/^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/.test(value));
        }

        if (name === 'confirmPassword') {
            setIsConfirmPasswordValid(value === formData.password);
        }
    };

    const handleIdCheck = async () => {
        const data = formData.id;
    
        const response = await fetch('/api/register/id', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({ data })
        });
        console.log(data);

        if (response.ok) {
            setIsIdChecked(true);
        } else {
            setIsIdChecked(false);
        }
    };

    const handleEmailSend = async () => {
        const response = await fetch('/api/register/sendCode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email })
        });

        if (response.ok) {
            setIsEmailSent(true);
        } else {
            setIsEmailSent(false);
        }
    };

    const handleCodeVerify = async () => {
        const response = await fetch('/api/register/veriftCode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: formData.code })
        });

        if (response.ok) {
            setIsCodeVerified(true);
        } else {
            setIsCodeVerified(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const response = await fetch('/api/register/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
    
        if (response.ok) {
            // 요청이 성공한 경우의 처리
            alert('회원가입이 완료되었습니다.');
        } else {
            // 요청이 실패한 경우의 처리
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const isFormValid = isIdChecked && isEmailSent && isCodeVerified && isPasswordValid && isConfirmPasswordValid;

    return (
        <div>
            <form className="registerForm" onSubmit={handleSubmit}>
                <div>
                    아이디: <input type="text" name="id" value={formData.id} onChange={handleChange} />
                    <button type="button" onClick={handleIdCheck}>확인</button>
                </div>
                <div>
                    이메일: <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    <button type="button" onClick={handleEmailSend}>전송</button>
                </div>
                <div>
                    코드: <input type="text" name="code" value={formData.code} onChange={handleChange} />
                    <button type="button" onClick={handleCodeVerify}>확인</button>
                </div>
                <div>
                    비밀번호: <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {isPasswordValid ? null : <span>비밀번호는 특수문자와 숫자를 포함하여 8글자 이상이어야 합니다.</span>}
                </div>
                <div>
                    비밀번호 확인: <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {isConfirmPasswordValid ? null : <span>비밀번호가 일치하지 않습니다.</span>}
                </div>
                <div>
                    <button type="submit" disabled={!isFormValid}>완료</button>
                </div>
            </form>
        </div>
    )
}