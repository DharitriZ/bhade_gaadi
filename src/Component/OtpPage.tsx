import React, { useState, useRef, useEffect } from 'react';
import otplogo from '../Assets/password.png';

const OtpPage = () => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [resendTimer, setResendTimer] = useState(30);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
                const newOtp = [...otp];
                newOtp[index - 1] = '';
                setOtp(newOtp);
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);

            newOtp.forEach((digit, idx) => {
                if (inputsRef.current[idx]) {
                    inputsRef.current[idx]!.value = digit;
                }
            });
            inputsRef.current[inputsRef.current.length - 1]?.focus();
        }
    };

    const handleClear = () => {
        setOtp(Array(6).fill(''));
        inputsRef.current[0]?.focus();
    };

    const handleResend = () => {
        console.log("Resending OTP...");
        setOtp(Array(6).fill(''));
        setResendTimer(30);
        inputsRef.current[0]?.focus();
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-cyan-500 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center w-full max-w-md">

                <h2 className="text-3xl font-extrabold text-cyan-500 mb-4 tracking-wide">OTP Verification</h2>
                <img src={otplogo} alt="OTP Logo" className="w-24 h-24 mb-6" />

                <div className="flex justify-center gap-3 mb-6">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            onFocus={(e) => e.target.select()}
                            ref={(el) => { inputsRef.current[index] = el }}
                            className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-sm"
                        />
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex w-full gap-4">
                    <button
                        onClick={handleClear}
                        className="flex-1 py-3 bg-cyan-500 text-white font-bold rounded-md hover:bg-cyan-600 transition-all duration-300"
                    >
                        Clear
                    </button>

                    <button
                        onClick={handleResend}
                        disabled={resendTimer > 0}
                        className={`flex-1 py-3 ${resendTimer > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'} text-white font-bold rounded-md transition-all duration-300`}
                    >
                        {resendTimer > 0 ? `Resend ${resendTimer}s` : 'Resend'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OtpPage;
