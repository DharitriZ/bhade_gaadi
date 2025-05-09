import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import otplogo from '../Assets/password.png';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { verifyOtpThunk } from '../Redux/Slices/AuthSlice';
import { ResendApi } from '../Apis/Api';
import toast from 'react-hot-toast';

const RESEND_TIMEOUT = 30; // Constant for resend timer

const OtpPage = () => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [resendTimer, setResendTimer] = useState(RESEND_TIMEOUT);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { sessionId, phoneNumber } = useAppSelector((state) => state.auth);

    const handleOtpVerification = async (enteredOtp: string) => {
        if (!sessionId || !phoneNumber) {
            toast.error('Session expired. Please login again.');
            navigate('/');
            return;
        }

        try {
            setLoading(true);
            const resultAction = await dispatch(verifyOtpThunk({ sessionId, phoneNumber, otp: enteredOtp }));

            if (verifyOtpThunk.fulfilled.match(resultAction)) {
                toast.success('Login successful!');
                navigate('/');
            } else {
                toast.error(resultAction.payload as string || 'Verification failed.');
                handleClear();
            }
        } catch (error) {
            toast.error('Error verifying OTP.');
            handleClear();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            setLoading(true);
            const response = await fetch(ResendApi, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber }),
            });

            const data = await response.json();

            if (response.ok && data.status === 200) {
                toast.success(data.message);
                setResendTimer(RESEND_TIMEOUT);
            } else {
                toast.error(data.error || 'Failed to resend OTP.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error resending OTP. Try again.');
        } finally {
            setLoading(false);
        }
    };

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
            setOtp(pastedData.split(''));
        }
    };

    const handleClear = () => {
        setOtp(Array(6).fill(''));
        inputsRef.current[0]?.focus();
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-cyan-500 px-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 flex flex-col items-center w-full max-w-md relative">
                <h2 className="text-3xl font-extrabold text-cyan-500 mb-4 tracking-wide">OTP Verification</h2>
                <img src={otplogo} alt="OTP Logo" className="w-24 h-24 mb-6" />

                {/* OTP Inputs */}
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

                {/* Verify Button */}
                <button
                    onClick={() => handleOtpVerification(otp.join(''))}
                    disabled={otp.some(digit => digit === '') || loading}
                    className="w-full py-3 mb-4 bg-cyan-500 text-white font-bold rounded-md hover:bg-cyan-600 transition-all duration-300 disabled:opacity-50"
                >
                    Verify OTP
                </button>

                {/* Clear and Resend Buttons */}
                <div className="flex w-full gap-4">
                    <button
                        onClick={handleClear}
                        disabled={loading}
                        className="flex-1 py-3 bg-cyan-500 text-white font-bold rounded-md hover:bg-cyan-600 transition-all duration-300 disabled:opacity-50"
                    >
                        Clear
                    </button>

                    <button
                        onClick={handleResend}
                        disabled={resendTimer > 0 || loading}
                        className={`flex-1 py-3 ${resendTimer > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'} text-white font-bold rounded-md transition-all duration-300 disabled:opacity-50`}
                    >
                        {resendTimer > 0 ? `Resend ${resendTimer}s` : 'Resend'}
                    </button>
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center rounded-2xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OtpPage;
