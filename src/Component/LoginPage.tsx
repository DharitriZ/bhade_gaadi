import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../store';
import { loginUserAction } from '../store/actions/auth';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useAppSelector((state) => state.auth.user);

    // Get the redirect path from location state or default to dashboard
    const from = (location.state as any)?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);

    const formik = useFormik({
        initialValues: {
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string()
                .required('Phone number is required')
                .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
        }),
        onSubmit: async (values) => {
            try {
                await dispatch(loginUserAction(values.phoneNumber)).unwrap();
                navigate('/verify-otp');
                toast.success('OTP sent successfully!');
            } catch (error) {
                toast.error(error.message || 'something went wrong please try again !');
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fff] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1E3A8A]">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please enter your phone number to continue
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">+91</span>
                                </div>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    maxLength={10}
                                    {...formik.getFieldProps('phoneNumber')}
                                    className="pl-12 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A]"
                                    placeholder="Enter 10 digit number"
                                />
                            </div>
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A8A] transition-colors duration-200"
                        >
                            Send OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
