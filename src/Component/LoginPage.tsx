import { Formik } from 'formik';
import * as Yup from 'yup';
import phoneCall from '../Assets/phone-call.png';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../Redux/hooks';
import { loginThunk } from '../Redux/Action/AuthAction';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const handleLogin = async (phoneNo: string) => {
        try {
            const resultAction = await dispatch(loginThunk(phoneNo));

            if (loginThunk.fulfilled.match(resultAction)) {
                toast.success('OTP sent successfully');

                navigate('/otp');
            } else {
                toast.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Something went wrong.');
        }
    };


    return (
        <div className="w-screen h-screen flex items-center justify-center bg-cyan-600 px-4">
            <div className="flex w-full max-w-md shadow-xl bg-white justify-center items-center p-10 rounded-2xl">
                <Formik
                    initialValues={{ phoneNo: '' }}
                    validationSchema={Yup.object({
                        phoneNo: Yup.string()
                            .required('Phone Number is required')
                            .test('valid-phone', 'Phone number must be 10 digits after country code', (value) => {
                                if (!value) return false;
                                const digitsOnly = value.replace(/\D/g, '');
                                if (digitsOnly.startsWith('91')) {
                                    return digitsOnly.length === 12;
                                }
                                return true;
                            }),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(values.phoneNo.slice(3));
                        await handleLogin(values.phoneNo.slice(3));
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                            <header className="text-cyan-500 font-serif font-bold text-4xl antialiased">
                                LOGIN
                            </header>

                            <img src={phoneCall} alt="Phone Call" className="w-36 h-36" />

                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="phoneNo" className="text-gray-700 font-semibold text-lg">
                                    Phone Number
                                </label>

                                <PhoneInput
                                    id="phoneNo"
                                    defaultCountry="IN"
                                    value={values.phoneNo}
                                    onChange={(phone) => setFieldValue('phoneNo', phone)}
                                    countries={['IN']}
                                    international={false}
                                    countryCallingCodeEditable={false}
                                    className="w-full bg-gray-100 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg border-white"
                                />


                                {errors.phoneNo && touched.phoneNo && (
                                    <div className="text-red-500 text-sm">{errors.phoneNo}</div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 transition duration-300 disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                NEXT
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default LoginPage;
