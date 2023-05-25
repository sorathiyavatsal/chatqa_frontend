// import axios from "../../config/api";
import { useEffect, useState } from "react";
import { setErrorMessage } from '../../redux/globalSlice'
import { setUserDetailInLocalSorage } from '../../utils/localStorage'
import { useLazyLoginQuery } from '../../servicesRtkQuery/publicApi'
import { useDispatch, useSelector } from "react-redux";
import { loginValidation } from '../../utils/validation';
import { setloginSignupVar } from '../../redux/loginSignupSlice';
import Error from "../../components/error";
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import Header from "../../components/header";

interface LoginData {
    email: string;
    password: string;
}
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPassword, setShowPassword]: any = useState(false)

    const errorMessages = useSelector((state: any) => state.globalReducer.errorMessages)
    const [logInData, setLogInData] = useState<LoginData>({
        email: "",
        password: ""
    });

    const onHandleChange = (e: any) => {
        setLogInData({
            ...logInData,
            [e.target.name]: e.target.value,
        });
    };

    const [trigger, result] = useLazyLoginQuery()
    const { isSuccess, isFetching, isError, error } = result

    const handleSubmit = (e: any) => {
        const result: any = loginValidation(logInData)
        if (result === true) {
            trigger(logInData)
        } else {
            dispatch(setErrorMessage(result))
            Swal.fire({
                toast: true,
                icon: 'error',
                title: result.email || result.password,
                position: 'top-right',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })
        }
        e.preventDefault();
    }

    useEffect(() => {
        if (isError) {
            Swal.fire({
                toast: true,
                icon: 'error',
                title: error?.data?.message ? error?.data?.message : "Something went wrong!\nPlease contact the administrator.",
                position: 'top-right',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })
        }
        if (isSuccess && !isFetching) {
            setUserDetailInLocalSorage(result.data.data)
            dispatch(setloginSignupVar({
                isUserHasToken: result.data.results?.token,
            }))
            dispatch(setloginSignupVar({
                isUserHasToken: result.data.results?.token,
            }))
            window.location.href = "/dashboard"
        }
    }, [isSuccess, isFetching])

    return (
        <div className="text-gray-600 body-font w-full select-none">
            <div className="mt-0 transition-all duration-200 ease-in-out">
                <div>
                    <div className="relative flex items-center min-h-[80vh] p-0 overflow-hidden bg-center bg-cover ">
                        <div className="w-full z-1">
                            <div className="flex flex-wrap justify-center">
                                <div className="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                                    <div className="relative h-full flex flex-col min-w-0 break-words bg-black shadow-xl shadow-gray-400 lg:py-4 rounded-2xl bg-clip-border">
                                        <div className="flex justify-center items-center select-none">
                                            <div className="text-5xl text-white font-bold">
                                                Chat
                                            </div>
                                            <div className="logo w-28 h-28">
                                                &nbsp;
                                            </div>
                                        </div>
                                        <div className="p-2 pb-0 mb-0 text-white">
                                            <h4 className="font-bold text-white text-center">Log In</h4>
                                        </div>
                                        <div className="flex-auto p-6">
                                            <form role="form">
                                                <div className="mb-4">
                                                    <div className="relative flex items-center text-gray-400 focus-within:text-yellow-300">
                                                        <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                                            <i className='fas fa-envelope w-4 fill-current'></i>
                                                        </span>
                                                        <input id="chatqa__email" type="email" name="email" placeholder="Email" onChange={(e: any) => onHandleChange(e)} className="w-full pl-14 pr-4 py-3 rounded-md text-sm text-gray-600 outline-none border-none transition shadow-black" />
                                                    </div>
                                                    {
                                                        errorMessages?.email && <Error message={errorMessages?.email} />
                                                    }
                                                </div>
                                                <div className="mb-4">
                                                    <div className="relative flex items-center text-gray-400 focus-within:text-yellow-300">
                                                        <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                                            <i className='fas fa-key w-4 fill-current'></i>
                                                        </span>
                                                        <input id="chatqa__password" type={`${showPassword ? "text" : "password"}`} name="password" placeholder="Password" onChange={(e: any) => onHandleChange(e)} className="w-full pl-14 pr-4 py-3 rounded-md text-sm text-gray-600 outline-none border-none transition shadow-black" />
                                                        <span className="absolute right-4 h-6 flex items-center cursor-pointer">
                                                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} w-4 fill-current`} onClick={() => {
                                                                setShowPassword(!showPassword)
                                                            }}></i>
                                                        </span>
                                                    </div>
                                                    {
                                                        errorMessages?.password && <Error message={errorMessages?.password} />
                                                    }
                                                </div>
                                                <div className="flex items-center mb-0.5 text-left min-h-6">
                                                    <label className="font-normal cursor-pointer select-none text-sm text-white hover:text-gray-500" htmlFor="forgot">Forgot Password ?</label>
                                                </div>
                                                <div className="text-center">
                                                    <button id="chatqa__signIn" type="button" className="inline-block w-full px-16 py-2 my-3 font-bold leading-normal text-center text-black align-middle transition-all bg-white border-2 border-white rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 hover:bg-black hover:text-white hover:border-white" onClick={(e) => handleSubmit(e)}>Sign In</button>
                                                </div>
                                                <div className="flex items-center mb-0.5 text-left min-h-6">
                                                    <label className="font-normal select-none text-sm text-white " htmlFor="forgot">Don't have an account ? <span className="text-yellow-300 cursor-pointer font-bold underline"
                                                        onClick={() => {
                                                            navigate('/signup')
                                                        }}> Sign Up</span></label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
