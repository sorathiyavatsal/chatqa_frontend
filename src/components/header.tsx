/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyGetUserPlanQuery } from "../servicesRtkQuery/publicApi";
import { useSelector } from 'react-redux';

export default function Header() {
    const navigate = useNavigate()
    const [token, setToken]: any = useState(true)
    const location = useLocation();
    var userData: any = localStorage.getItem("chatQa_user");
    userData = JSON.parse(userData)
    const [getuserPlan, UserPlanResult] = useLazyGetUserPlanQuery()
    const { isSuccess: isUsuccess, isLoading: isUFetching, } = UserPlanResult
    const [userPlan, setUserPlan]: any = useState([]);
    var point: any  = useSelector((state: any) => state?.UserDetailsSlice?.User?.points)
    if (userData?.isSubscribe === true) {
        point = 0
        console.log("calll")
    }
   
    useEffect(() => {
        setToken(localStorage.getItem('chatQa_token'))
        getuserPlan({})
        
    }, [])
    console.log(point)
    useEffect(() => {
        if (isUsuccess && !isUFetching) {
            let userPlanData: any = UserPlanResult?.data?.data.filter((item: any) => item?.userId === userData?._id && item?.isActive === true)
            setUserPlan(userPlanData)
            console.log(userPlanData)
        }
    }, [isUsuccess, isUFetching, UserPlanResult])
    const CloseMenu = () => {
        const elem: any = document.activeElement;
        elem?.blur();
    }

    return (
        <div className="select-none">
            <div className="isolate text-center gap-x-6 overflow-hidden bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                <p className="text-sm leading-6 text-gray-50">
                    <i className="fas fa-volume-up mx-2"></i>
                    <strong className="font-semibold">Now supporting all learning platforms with our new text selection feature!</strong>
                </p>
            </div>
            <header className="relative z-50 w-full h-24">
                <div className="navbar flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0">
                    <div className="navbar-start w-full">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost hover:bg-transparent lg:hidden">
                                <button className="relative group">
                                    <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[45px] h-[45px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                                        <div className="flex flex-col justify-between w-[18px] h-[18px] transform transition-all duration-300 origin-center overflow-hidden">
                                            <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:rotate-[42deg]"></div>
                                            <div className="bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 group-focus:-translate-x-10"></div>
                                            <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg]"></div>
                                        </div>
                                    </div>
                                </button>
                            </label>
                            <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52">
                                <li>
                                    <a href="/#" className="ml-0 mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#")}>Home</a>
                                </li>
                                <li>
                                    <a href="#features" className="mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#features")}>Features</a>
                                </li>
                                <li>
                                    <a href="#pricing" className="mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#pricing")}>Pricing</a>
                                </li>
                                <li>
                                    <a href="#howitworks" className="mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#howitworks")}>How It Works</a>
                                </li>
                                <li>
                                    <a href="#faq" className="mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#faq")}>FAQ</a>
                                </li>
                                <div className="w-full font-medium border-t border-gray-200 cursor-pointer"
                                    onClick={() => {
                                        CloseMenu()
                                        if (token) {
                                            localStorage.clear();
                                            setToken('');
                                            navigate('/');
                                        }
                                        else {
                                            navigate('/login');
                                        }
                                    }}>
                                    <div className="w-full py-2 font-bold text-center text-yellow-400">{token ? "Log Out" : "Login"}</div>
                                </div>
                                {
                                    token ?
                                        <div className="w-full font-medium border-t border-gray-200 cursor-pointer"
                                            onClick={() => {
                                                navigate('/dashboard');
                                            }}>
                                            <div className="w-full py-2 font-bold text-center text-yellow-400">
                                                {
                                                    location?.pathname === "/dashboard" ? <>
                                                        {userPlan && userPlan?.length !== 0  && userData?.isSubscribe === true? <div><i className="	fas fa-robot"></i> <span>{userPlan?.[0]?.totalPoints - userPlan?.[0]?.points}</span></div> : <div><i className="fas fa-robot"></i> <span>{point}</span></div>}
                                                    </> : <div>Dashboard</div>
                                                }
                                            </div>
                                        </div>
                                        :
                                        <div className="w-full font-medium border-t border-gray-200 cursor-pointer"
                                            onClick={() => {
                                                CloseMenu()
                                                localStorage.clear();
                                                navigate('/signup');
                                            }}>
                                            <div className="w-full py-2 font-bold text-center text-yellow-400">SignUp</div>
                                        </div>
                                }
                            </ul>
                        </div>
                        <a href="/#" className="relative flex items-center justify-center w-full h-full font-black leading-none -ml-5" onClick={() => navigate("/")}>
                            <div className="flex items-center">
                                <span className="ml-3 text-2xl text-gray-800">Chat</span><img src="../../assets/images/logo.png" className="w-14 h-14" alt="" />
                            </div>
                        </a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <a href="/#" className="ml-0 mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#")}>Home</a>
                            </li>
                            <li>
                                <a href="#features" className="mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#features")}>Features</a>
                            </li>
                            <li>
                                <a href="#pricing" className="mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#pricing")}>Pricing</a>
                            </li>
                            <li>
                                <a href="#howitworks" className="mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#howitworks")}>How It Works</a>
                            </li>
                            <li>
                                <a href="#faq" className="mr-0 bg-transparent font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#faq")}>FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-end hidden lg:flex">
                        <div className="absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between gap-2">
                            <button type="button" onClick={() => {
                                if (token) {
                                    localStorage.clear();
                                    setToken('');
                                    navigate('/');
                                }
                                else {
                                    navigate('/login');
                                }
                            }} className="btn self-start w-auto mx-auto mt-0 text-base font-bold text-black border-0 fold-bold lg:mx-0 flex items-center hover:text-white bg-themeColor">
                                <div>{token ? "Log Out" : "Login"}</div>
                            </button>
                            {
                                token ?
                                    <button type="button" onClick={() => {
                                        navigate('/dashboard');
                                    }} className="btn self-start w-auto mx-auto mt-0 text-base font-bold text-black border-0 fold-bold lg:mx-0 flex items-center hover:text-white bg-themeColor">
                                        {
                                            location?.pathname === "/dashboard" ? <>
                                                {userPlan && userPlan?.length !== 0 && userData?.isSubscribe === true ? <div><i className="	fas fa-robot"></i> <span>{userPlan?.[0]?.totalPoints - userPlan?.[0]?.points}</span></div> : <div><i className="fas fa-robot"></i> <span>{point}</span></div>}
                                            </> : <div>Dashboard</div>
                                        }
                                    </button>
                                    :
                                    <button type="button" onClick={() => {
                                        localStorage.clear();
                                        navigate('/signup');
                                    }} className="btn self-start w-auto mx-auto mt-0 text-base font-bold text-black border-0 fold-bold lg:mx-0 flex items-center hover:text-white bg-themeColor">
                                        <div className="whitespace-nowrap flex items-center gap-1">
                                            <span className="chakra-button__icon css-1wh2kri"><svg viewBox="0 0 190.5 190.5" height="25" width="25" focusable="false" className="chakra-icon css-1abm4xl" aria-hidden="true"><g transform="translate(90.669 -507.469)"><path d="M4.583 650.342c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z" fill="#fff" clipPath="none" mask="none"></path><path d="M-36.664 626.539l-41.24-71.43c-8.362 14.479-12.765 30.904-12.765 47.625s4.401 33.146 12.762 47.625 20.387 26.503 34.868 34.86 30.908 12.755 47.628 12.75l41.24-71.43v-.011c-4.177 7.244-10.188 13.26-17.428 17.443a47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z" fill="#229342" clipPath="none" mask="none"></path><path d="M45.826 626.536l-41.239 71.43c16.72.003 33.146-4.398 47.626-12.757s26.504-20.384 34.863-34.865a95.24 95.24 0 0 0 12.755-47.627c-.003-16.72-4.408-33.145-12.772-47.623H4.58l-.01.007a47.62 47.62 0 0 1 23.819 6.372c7.243 4.179 13.257 10.19 17.439 17.431a47.62 47.62 0 0 1-.001 47.633z" fill="#fbc116" clipPath="none" mask="none"></path><path d="M4.583 640.43c20.824 0 37.705-16.881 37.705-37.706s-16.881-37.705-37.705-37.705-37.705 16.881-37.705 37.705 16.881 37.706 37.705 37.706z" fill="#1a73e8" clipPath="none" mask="none"></path><path d="M4.583 555.097h82.479c-8.358-14.481-20.381-26.507-34.861-34.868a95.23 95.23 0 0 0-47.625-12.76c-16.72.001-33.145 4.404-47.623 12.767a95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633c4.179-7.242 10.193-13.256 17.434-17.436s15.456-6.381 23.818-6.379z" fill="#e33b2e" clipPath="none" mask="none"></path></g></svg></span><span className="css-124juzh"></span><span className="css-rqgsqp">Get Started</span>
                                        </div>
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}