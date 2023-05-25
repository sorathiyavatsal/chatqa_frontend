import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen]: any = useState(false)
    const navigate = useNavigate()
    const [token, setToken]: any = useState(true)

    useEffect(() => {
        setToken(localStorage.getItem('chatQa_token'))
    }, [])

    return (
        <div className="select-none">
            <div className="isolate text-center gap-x-6 overflow-hidden bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                <p className="text-sm leading-6 text-gray-50">
                    <i className="fas fa-volume-up mx-2"></i>
                    <strong className="font-semibold">Now supporting all learning platforms with our new text selection feature!</strong>
                </p>
            </div>
            <header className="relative z-50 w-full h-24">
                <div className="flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0">
                    <a href="/#" className="relative flex items-center h-full font-black leading-none -ml-5" onClick={() => navigate("/")}>
                        <span className="ml-3 text-2xl text-gray-800">Chat</span><img src="../../assets/images/logo.png" className="w-14 h-14" alt="" />
                    </a>
                    <nav id="nav" className={`absolute top-0 left-0 z-50 flex flex-col items-center justify-between w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative gap-3 ${menuOpen ? "" : "hidden"}`}>
                        <a href="/#" className="ml-0 mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#")}>Home</a>
                        <a href="#features" className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#features")}>Features</a>
                        <a href="#pricing" className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#pricing")}>Pricing</a>
                        <a href="#howitworks" className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-themeColor" onClick={() => navigate("/#howitworks")}>How It Works</a>
                        <a href="#faq" className="font-bold duration-100 transition-color hover:text-themeColor" onClick={() => navigate("/#faq")}>FAQ</a>
                        <div className="w-full font-medium border-t border-gray-200 md:hidden cursor-pointer"
                            onClick={() => {
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
                    </nav>

                    <div className="absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between gap-2">
                        <button className="self-start w-auto px-6 py-2 mx-auto mt-0 text-base font-bold text-black bg-themeColor border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0 flex items-center gap-2" onClick={() => {
                            if (token) {
                                localStorage.clear();
                                setToken('');
                                navigate('/');
                            }
                            else {
                                navigate('/login');
                            }
                        }}>{token ? "Log Out" : "Login"}
                        </button>
                        {
                            token ?
                                <button type="button" onClick={() => {
                                    navigate('/dashboard');
                                }} className="self-start w-auto px-6 py-2 mx-auto mt-0 text-base font-bold text-black bg-themeColor border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0 flex items-center gap-2"><span className="css-rqgsqp">Dashboard</span></button>
                                :
                                <button type="button" onClick={() => {
                                    localStorage.clear();
                                    navigate('/signup');
                                }} className="self-start w-auto px-6 py-2 mx-auto mt-0 text-base font-bold text-black bg-themeColor border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0 flex items-center gap-2"><span className="chakra-button__icon css-1wh2kri"><svg viewBox="0 0 190.5 190.5" height="25" width="25" focusable="false" className="chakra-icon css-1abm4xl" aria-hidden="true"><g transform="translate(90.669 -507.469)"><path d="M4.583 650.342c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z" fill="#fff" clipPath="none" mask="none"></path><path d="M-36.664 626.539l-41.24-71.43c-8.362 14.479-12.765 30.904-12.765 47.625s4.401 33.146 12.762 47.625 20.387 26.503 34.868 34.86 30.908 12.755 47.628 12.75l41.24-71.43v-.011c-4.177 7.244-10.188 13.26-17.428 17.443a47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z" fill="#229342" clipPath="none" mask="none"></path><path d="M45.826 626.536l-41.239 71.43c16.72.003 33.146-4.398 47.626-12.757s26.504-20.384 34.863-34.865a95.24 95.24 0 0 0 12.755-47.627c-.003-16.72-4.408-33.145-12.772-47.623H4.58l-.01.007a47.62 47.62 0 0 1 23.819 6.372c7.243 4.179 13.257 10.19 17.439 17.431a47.62 47.62 0 0 1-.001 47.633z" fill="#fbc116" clipPath="none" mask="none"></path><path d="M4.583 640.43c20.824 0 37.705-16.881 37.705-37.706s-16.881-37.705-37.705-37.705-37.705 16.881-37.705 37.705 16.881 37.706 37.705 37.706z" fill="#1a73e8" clipPath="none" mask="none"></path><path d="M4.583 555.097h82.479c-8.358-14.481-20.381-26.507-34.861-34.868a95.23 95.23 0 0 0-47.625-12.76c-16.72.001-33.145 4.404-47.623 12.767a95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633c4.179-7.242 10.193-13.256 17.434-17.436s15.456-6.381 23.818-6.379z" fill="#e33b2e" clipPath="none" mask="none"></path></g></svg></span><span className="css-124juzh"></span><span className="css-rqgsqp">Get Started</span></button>
                        }
                    </div>
                    <div id="nav-mobile-btn"
                        className="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none md:hidden sm:mt-10" onClick={() => {
                            setMenuOpen(!menuOpen);
                        }}>
                        <span className="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1"></span>
                        <span className="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full"></span>
                    </div>
                </div>
            </header>
        </div>
    )
}