import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../store';
import { verifyLoginOtpAction, loginUserAction } from '../store/actions/auth';
import { toast } from 'react-toastify';

const OtpPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const { phoneNumber, sessionId } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!phoneNumber) {
            navigate('/');
        }
    }, [phoneNumber, navigate]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendDisabled && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
            setCountdown(30);
        }
        return () => clearInterval(timer);
    }, [resendDisabled, countdown]);

    const handleResendOtp = async () => {
        setResendDisabled(true);
        try {
            await dispatch(loginUserAction(phoneNumber)).unwrap();
        } catch (error) {
            console.error('Resend OTP failed:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required('OTP is required')
                .matches(/^[0-9]{6}$/, 'OTP must be exactly 6 digits'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await dispatch(verifyLoginOtpAction({
                    phoneNumber,
                    sessionId,
                    otp: values.otp,
                })).unwrap();
                toast.success('login successfull')
                navigate('/dashboard');
            } catch (error) {
                toast.error(error.message || 'something went wrong please try again !');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1E3A8A] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1E3A8A]">
                        Verify OTP
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter the 6-digit code sent to {phoneNumber}
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                                OTP Code
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                maxLength={6}
                                {...formik.getFieldProps('otp')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-center text-2xl tracking-widest"
                                placeholder="000000"
                            />
                            {formik.touched.otp && formik.errors.otp && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.otp}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A8A] transition-colors duration-200"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>

                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={resendDisabled}
                            className="w-full flex justify-center py-2 px-4 border border-[#1E3A8A] text-sm font-medium rounded-md text-[#1E3A8A] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A8A] transition-colors duration-200"
                        >
                            {resendDisabled
                                ? `Resend OTP in ${countdown}s`
                                : 'Resend OTP'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpPage;
