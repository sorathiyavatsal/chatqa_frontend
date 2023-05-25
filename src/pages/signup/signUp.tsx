// import axios from "../../config/api";
import { useEffect, useState } from "react";
import { setErrorMessage } from '../../redux/globalSlice'
import { setUserDetailInLocalSorage } from '../../utils/localStorage'
import { useLazyLoginQuery, useLazySignUpQuery } from '../../servicesRtkQuery/publicApi'
import { useDispatch, useSelector } from "react-redux";
import { UserValidation, loginValidation } from '../../utils/validation';
import { setloginSignupVar } from '../../redux/loginSignupSlice';
import Error from "../../components/error";
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import Header from "../../components/header";

interface Data {
    name: string;
    email: string;
    password: string;
    confirmPassword: string,
}
const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const errorMessages = useSelector((state: any) => state.globalReducer.errorMessages)
    const [userData, setUserData] = useState<Data>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword]: any = useState(false)
    const [showConfirmPassword, setShowConfirmPassword]: any = useState(false)
    const onHandleChange = (e: any) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const [trigger, result] = useLazySignUpQuery()
    const { isSuccess, isFetching, isError, error } = result

    const [loginTrigger, loginResult] = useLazyLoginQuery()
    const { isSuccess: isLoginSuccess, isFetching: isLoginFetching } = loginResult

    const handleSubmit = (e: any) => {
        const result: any = UserValidation(userData)
        if (result === true) {
            trigger({
                name: userData?.name,
                email: userData?.email,
                password: userData?.password
            })
        } else {
            dispatch(setErrorMessage(result))
            Swal.fire({
                toast: true,
                icon: 'error',
                title: result.email || result.password || result.name || result.cPassword,
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
            loginTrigger({
                email: userData?.email,
                password: userData?.password
            })
        }
    }, [isSuccess, isFetching])

    useEffect(() => {
        if (isLoginSuccess && !isLoginFetching) {
            setUserDetailInLocalSorage(loginResult.data.data)
            dispatch(setloginSignupVar({
                isUserHasToken: loginResult.data.results?.token,
            }))
            dispatch(setloginSignupVar({
                isUserHasToken: loginResult.data.results?.token,
            }))
            navigate("/")
        }
    }, [isSuccess, isLoginFetching])

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
                                            <h4 className="font-bold text-white text-center">Sign Up</h4>
                                        </div>
                                        <div className="flex-auto p-6">
                                            <form role="form">
                                                <div className="mb-4">
                                                    <div className="relative flex items-center text-gray-400 focus-within:text-yellow-300">
                                                        <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                                            <i className='fas fa-user w-4 fill-current'></i>
                                                        </span>
                                                        <input id="chatqa__name" type="text" name="name" placeholder="Name" onChange={(e: any) => onHandleChange(e)} className="w-full pl-14 pr-4 py-3 rounded-md text-sm text-gray-600 outline-none border-none transition shadow-black" />
                                                    </div>
                                                    {
                                                        errorMessages?.name && <Error message={errorMessages?.name} />
                                                    }
                                                </div>
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
                                                <div className="mb-4">
                                                    <div className="relative flex items-center text-gray-400 focus-within:text-yellow-300">
                                                        <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                                            <i className='fas fa-key w-4 fill-current'></i>
                                                        </span>
                                                        <input id="chatqa__confirmpassword" type={`${showConfirmPassword ? "text" : "password"}`} name="confirmPassword" placeholder="Confirm Password" onChange={(e: any) => onHandleChange(e)} className="w-full pl-14 pr-4 py-3 rounded-md text-sm text-gray-600 outline-none border-none transition shadow-black" />
                                                        <span className="absolute right-4 h-6 flex items-center cursor-pointer">
                                                            <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} w-4 fill-current`} onClick={() => {
                                                                setShowConfirmPassword(!showConfirmPassword)
                                                            }}></i>
                                                        </span>
                                                    </div>
                                                    {
                                                        errorMessages?.cPassword && <Error message={errorMessages?.cPassword} />
                                                    }
                                                </div>
                                                <div className="text-center">
                                                    <button id="chatqa__signIn" type="button" className="inline-block w-full px-16 py-2 my-3 font-bold leading-normal text-center text-black align-middle transition-all bg-white border-2 border-white rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 hover:bg-black hover:text-white hover:border-white" onClick={(e) => handleSubmit(e)}>Sign Up</button>
                                                </div>
                                                <div className="flex items-center mb-0.5 text-left min-h-6">
                                                    <label className="font-normal select-none text-sm text-white " htmlFor="forgot">Already have an account ? <span className="text-yellow-300 cursor-pointer font-bold underline"
                                                        onClick={() => {
                                                            navigate('/login')
                                                        }}> Sign In</span></label>
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

export default SignUp;
