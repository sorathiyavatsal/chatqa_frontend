import { useEffect, useState } from "react";
import { useLazySubscriptionsQuery } from "../../servicesRtkQuery/publicApi";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/footer";

export default function Home() {
    const navigate = useNavigate()
    const [trigger, result] = useLazySubscriptionsQuery()
    const { isSuccess, isFetching } = result

    const [plans, setPlans]: any = useState([])
    useEffect(() => {
        trigger('')
    }, [trigger])

    useEffect(() => {
        if (isSuccess && !isFetching) {
            setPlans(result?.data?.data)
        }
    }, [isSuccess, isFetching, result?.data?.data])

    return (
        <div className="select-none">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-full overflow-x-hidden pb-5 px-0 md:px-32 gap-5 lg:gap-0">
                <div className="flex flex-col items-center justify-between h-full max-w-6xl px-8 mb-10 lg:mb-0 mx-auto -mt-32 lg:flex-row xl:px-0">
                    <div
                        className="z-30 flex flex-col items-center w-full max-w-xl pt-20 text-center lg:items-start lg:w-full lg:pt-32 xl:pt-40 lg:text-left">
                        <h1 className="relative mb-4 text-3xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-8">4x Faster Assignment Completion</h1>
                        <p className="pr-0 mb-8 text-base text-gray-600 sm:text-lg xl:text-xl lg:pr-20">Harness the power of A.I. technology to help you learn faster. </p>
                        <button type="button" onClick={() => {
                            localStorage.clear();
                            navigate('/signup');
                        }} className="btn self-start w-auto mx-auto mt-0 text-base font-bold text-black bg-themeColor border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0 flex items-center gap-2 hover:text-white">
                            <div>
                                <span className="css-1wh2kri"><svg viewBox="0 0 190.5 190.5" height="25" width="25" focusable="false" className="chakra-icon css-1abm4xl" aria-hidden="true"><g transform="translate(90.669 -507.469)"><path d="M4.583 650.342c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z" fill="#fff" clipPath="none" mask="none"></path><path d="M-36.664 626.539l-41.24-71.43c-8.362 14.479-12.765 30.904-12.765 47.625s4.401 33.146 12.762 47.625 20.387 26.503 34.868 34.86 30.908 12.755 47.628 12.75l41.24-71.43v-.011c-4.177 7.244-10.188 13.26-17.428 17.443a47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z" fill="#229342" clipPath="none" mask="none"></path><path d="M45.826 626.536l-41.239 71.43c16.72.003 33.146-4.398 47.626-12.757s26.504-20.384 34.863-34.865a95.24 95.24 0 0 0 12.755-47.627c-.003-16.72-4.408-33.145-12.772-47.623H4.58l-.01.007a47.62 47.62 0 0 1 23.819 6.372c7.243 4.179 13.257 10.19 17.439 17.431a47.62 47.62 0 0 1-.001 47.633z" fill="#fbc116" clipPath="none" mask="none"></path><path d="M4.583 640.43c20.824 0 37.705-16.881 37.705-37.706s-16.881-37.705-37.705-37.705-37.705 16.881-37.705 37.705 16.881 37.706 37.705 37.706z" fill="#1a73e8" clipPath="none" mask="none"></path><path d="M4.583 555.097h82.479c-8.358-14.481-20.381-26.507-34.861-34.868a95.23 95.23 0 0 0-47.625-12.76c-16.72.001-33.145 4.404-47.623 12.767a95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633c4.179-7.242 10.193-13.256 17.434-17.436s15.456-6.381 23.818-6.379z" fill="#e33b2e" clipPath="none" mask="none"></path></g></svg></span><span className="css-124juzh"></span>
                            </div>
                            <span className="css-rqgsqp">Add to Chrome</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                        <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-whit">
                            <img src="../../assets/images/extension.png" className="h-full w-full float-right rounded-xl" alt="" />
                        </div>
                    </div>
                    <div className="relative mx-auto bg-gray-900 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
                    </div>
                </div>
            </div>

            {/* Feature */}
            <Feature />

            {/* Pricing */}
            <div className="relative px-8 py-10 bg-white border-t border-gray-200 md:py-16 lg:py-10 xl:py-10 xl:px-0">
                <div id="pricing" className="container flex flex-col items-center h-full max-w-6xl mx-auto">
                    <h2 className="my-5 text-base font-medium tracking-tight text-themeColor uppercase">Our Pricing</h2>
                    <h2 className=" mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        <span className="relative inline-block">
                            <svg
                                viewBox="0 0 52 24"
                                fill="currentColor"
                                className="absolute top-0 left-0 z-0 w-32 -mt-8 -ml-20 text-themeColor lg:w-32 lg:-ml-28 lg:-mt-10"
                            >
                                <defs>
                                    <pattern
                                        id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                                        x="0"
                                        y="0"
                                        width=".135"
                                        height=".30"
                                    >
                                        <circle cx="1" cy="1" r=".7" />
                                    </pattern>
                                </defs>
                                <rect
                                    fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                                    width="52"
                                    height="24" />
                            </svg>
                            <span className="relative">Simple, Transparent Pricing for Everyone</span>
                        </span>
                    </h2>
                    <div className="max-w-full mx-auto md:max-w-full">
                        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {plans?.map((item: any, index: any) => {
                                return (
                                    <div key={index}
                                        className="z-0 w-full max-w-sm my-8 border border-gray-200 rounded-lg">
                                        <div className="overflow-hidden text-black bg-white border-t border-gray-100 rounded-lg shadow-sm">
                                            <div className="block h-44 max-w-sm px-2 mx-auto mt-5 text-sm text-left text-black overflow-ellipsis">
                                                <h3 className="py-3 text-base font-bold tracking-wide text-center uppercase">{item?.name}<span
                                                    className="ml-2 font-light">Plan</span></h3>
                                                <h4
                                                    className="flex items-center justify-center pb-6 text-4xl font-bold text-center text-gray-900">${item?.amount}</h4>
                                                <p className="text-sm text-gray-600 text-center">In our {item?.name} plan you can take advantage of all these
                                                    features below.
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap px-6 mt-8 h-32">
                                                <ul>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-base text-gray-700">Days : {item?.day}</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <div className="p-2 text-green-500 rounded-full fill-current ">
                                                            <svg className="w-6 h-6 align-middle" viewBox="0 0 24 24" fill="none"
                                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                        </div>
                                                        <span className="ml-3 text-base text-gray-700">Tokens : {item?.points}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="uppercase mt-5">
                                                <a href={`/dashboard?id=${item?._id}`}
                                                    className="block w-full px-6 py-3 text-base font-semibold text-center text-white bg-gray-900 rounded shadow-sm hover:text-black hover:bg-[#FEDC00]">Subscribe Now</a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* How it works */}
            <div id="howitworks" className="flex items-center justify-center w-full px-8 py-10 border-t border-gray-200 md:py-16 lg:py-24 xl:py-40 xl:px-0">
                <div className="max-w-6xl mx-auto">
                    <div className="flex-col items-center ">
                        <div className="flex flex-col items-center justify-center w-full h-full max-w-2xl pr-8 mx-auto text-center">
                            <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                                <span className="relative inline-block">
                                    <svg
                                        viewBox="0 0 52 24"
                                        fill="currentColor"
                                        className="absolute top-0 left-0 z-0 w-32 -mt-8 -ml-20 text-themeColor lg:w-32 lg:-ml-28 lg:-mt-10"
                                    >
                                        <defs>
                                            <pattern
                                                id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                                                x="0"
                                                y="0"
                                                width=".135"
                                                height=".30"
                                            >
                                                <circle cx="1" cy="1" r=".7" />
                                            </pattern>
                                        </defs>
                                        <rect
                                            fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                                            width="52"
                                            height="24" />
                                    </svg>
                                    <span className="relative">How It Works</span>
                                </span>
                            </h2>
                            <p className="my-6 text-xl font-medium text-gray-500">Don't just take our word for it, read from our
                                extensive
                                list of case studies and customer howitworks.</p>

                        </div>
                        <div className="flex flex-col items-center justify-center max-w-2xl py-8 mx-auto xl:flex-row xl:max-w-full">
                            <div className="w-full xl:w-1/2 xl:pr-8">
                                <blockquote
                                    className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 text-center transition-all duration-200 bg-gray-100 rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease">
                                    <div className="flex flex-col pr-8">
                                        <div className="relative pl-12">
                                            <svg className="absolute left-0 w-10 h-10 text-themeColor fill-current"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                                <path
                                                    d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                            </svg>
                                            <p className="mt-2 text-base text-gray-600">I'm loving these templates! Very nice
                                                features and layouts.
                                            </p>
                                        </div>

                                        <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">Sandra
                                            Walton <span className="mt-1 text-sm leading-5 text-gray-500 truncate">- CEO
                                                SomeCompany</span></h3>
                                        <p className="mt-1 text-sm leading-5 text-gray-500 truncate"></p>
                                    </div>
                                    <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                        src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2694&q=80"
                                        alt="" />
                                </blockquote>
                                <blockquote
                                    className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 mt-16 mb-16 text-center transition-all duration-200 bg-gray-100 rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease xl:mb-0">
                                    <div className="flex flex-col pr-10">
                                        <div className="relative pl-12">
                                            <svg className="absolute left-0 w-10 h-10 text-themeColor fill-current"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                                <path
                                                    d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                            </svg>
                                            <p className="mt-2 text-base text-gray-600">Really digging this service. Now I can
                                                quickly bootstrap any
                                                project.</p>
                                        </div>
                                        <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">Kenny
                                            Jones <span className="mt-1 text-sm leading-5 text-gray-500 truncate">- CEO
                                                SomeCompany</span></h3>
                                        <p className="mt-1 text-sm leading-5 text-gray-500 truncate"></p>
                                    </div>
                                    <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                        src="https://images.unsplash.com/photo-1546820389-44d77e1f3b31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"
                                        alt="" />
                                </blockquote>
                            </div>
                            <div className="w-full xl:w-1/2 xl:pl-8">
                                <blockquote
                                    className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 text-center transition-all duration-200 bg-gray-100 rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease">
                                    <div className="flex flex-col pr-10">
                                        <div className="relative pl-12">
                                            <svg className="absolute left-0 w-10 h-10 text-themeColor fill-current"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                                <path
                                                    d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                            </svg>
                                            <p className="mt-2 text-base text-gray-600">Extremely helpful in every single project we
                                                have released.
                                            </p>
                                        </div>

                                        <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">Mike Smith
                                            <span className="mt-1 text-sm leading-5 text-gray-500 truncate">- CEO SomeCompany</span>
                                        </h3>
                                        <p className="mt-1 text-sm leading-5 text-gray-500 truncate"></p>
                                    </div>
                                    <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80"
                                        alt="" />
                                </blockquote>
                                <blockquote
                                    className="flex flex-col-reverse items-center justify-between w-full col-span-1 p-6 mt-16 text-center transition-all duration-200 bg-gray-100 rounded-lg md:flex-row md:text-left hover:bg-white hover:shadow ease">
                                    <div className="flex flex-col pr-10">
                                        <div className="relative pl-12">
                                            <svg className="absolute left-0 w-10 h-10 text-themeColor fill-current"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                                                <path
                                                    d="M30.7 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2C12.7 83.1 5 72.6 5 61.5c0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S30.7 31.6 30.7 42zM82.4 42c0 6.1 12.6 7 12.6 22 0 11-7.9 19.2-18.9 19.2-11.8 0-19.5-10.5-19.5-21.6 0-19.2 18-44.6 29.2-44.6 2.8 0 7.9 2 7.9 5.4S82.4 31.6 82.4 42z" />
                                            </svg>
                                            <p className="mt-2 text-base text-gray-600">Finally a quick and easy system I can use
                                                for any type of
                                                project.</p>
                                        </div>

                                        <h3 className="pl-12 mt-3 text-base font-medium leading-5 text-gray-800 truncate">Molly
                                            Sanchez <span className="mt-1 text-sm leading-5 text-gray-500 truncate">- CEO
                                                SomeCompany</span></h3>
                                        <p className="mt-1 text-sm leading-5 text-gray-500 truncate"></p>
                                    </div>
                                    <img className="flex-shrink-0 object-cover w-24 h-24 mb-5 bg-gray-300 rounded-full md:mb-0"
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80"
                                        alt="" />
                                </blockquote>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div id="faq" className="flex items-center justify-center w-full px-8 py-10 border-t border-gray-200 md:py-16 lg:py-24 xl:py-40 xl:px-0">
                <div className="max-w-screen-xl mx-auto px-5 bg-white">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center w-full h-full max-w-2xl pr-8 mx-auto text-center">
                            <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                                <span className="relative inline-block">
                                    <svg viewBox="0 0 52 24"
                                        fill="currentColor"
                                        className="absolute top-0 left-0 z-0 w-32 -mt-8 -ml-20 text-themeColor lg:w-32 lg:-ml-28 lg:-mt-10">
                                        <defs>
                                            <pattern id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                                                x="0"
                                                y="0"
                                                width=".135"
                                                height=".30">
                                                <circle cx="1" cy="1" r=".7" />
                                            </pattern>
                                        </defs>
                                        <rect fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                                            width="52"
                                            height="24" />
                                    </svg>
                                    <span className="relative">Frequently Asked Questions</span>
                                </span>
                            </h2>
                        </div>
                        <div className="mx-auto px-5 bg-white transform transition duration-300 ease-in-out">
                            <div className="grid max-w-xl mx-auto mt-8">
                                <div className="py-3">
                                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 rounded-box">
                                        <div className="collapse-title text-xl font-medium">
                                            <span className="flex items-center"><svg className="w-5 h-5 mr-2 shrink-0 text-themeColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Does it work on all learning platforms?</span>
                                        </div>
                                        <div className="collapse-content">
                                            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                                Our button is supported on the following learning platforms: Canvas 2.0, McGraw Hill Connect, Blackboard, D2L Brightspace, Moodle, Cengage MindTap.
                                            </p>
                                            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                                Learning platform isn't listed? Just use our text selection right-click feature to find answers on all other Learning Platforms!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 rounded-box">
                                        <div className="collapse-title text-xl font-medium">
                                            <span className="flex items-center"><svg className="w-5 h-5 mr-2 shrink-0 text-themeColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Does it work with lockdown browsers?</span>
                                        </div>
                                        <div className="collapse-content">
                                            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                                Yes! Chat QA is compatible with lockdown browsers and functions seamlessly on top of any Learning Management System (LMS).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 rounded-box">
                                        <div className="collapse-title text-xl font-medium">
                                            <span className="flex items-center"><svg className="w-5 h-5 mr-2 shrink-0 text-themeColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Will it show on my teacher's side?</span>
                                        </div>
                                        <div className="collapse-content">
                                            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                                No! Chat QA is entirely undetectable, foolproof, and will even outwit your instructor's specialized software.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 rounded-box">
                                        <div className="collapse-title text-xl font-medium">
                                            <span className="flex items-center"><svg className="w-5 h-5 mr-2 shrink-0 text-themeColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>Can I promote Chat QA?</span>
                                        </div>
                                        <div className="collapse-content">
                                            <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                                Even better, you can get paid to promote Chat QA! Click here to learn how!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center w-full px-8 border-gray-200 py-5 md:py-16 lg:py-24 xl:px-0 text-white">
                <div className="max-w-screen-xl mx-auto px-5 bg-black rounded-box shadow border border-gray-200">
                    <div className="flex flex-col items-center text-center p-8 px-0 md:px-40">
                        <div className="max-w-sm p-6 bg-black">
                            <div className="flex justify-center md:justify-end -mt-24 -mr-0 md:-mr-44 items-center">
                                <i className="p-4 object-cover rounded-full border-2 bg-black shadow-md text-center text-5xl fas fa-gift"></i>
                            </div>
                            <div>
                                <h5 className="mb-2 text-5xl font-bold tracking-tight text-white">Try for free!</h5>
                            </div>
                            <p className="mb-3 font-bold text-lg text-white py-3">Use Chat QA for free on your first 10 homework questions</p>
                            <NavLink to="/signup" className="inline-flex items-center px-4 py-3 text-base font-medium text-center text-black bg-white rounded-box hover:bg-themeColor hover:text-black focus:ring-4 focus:outline-none focus:ring-themeColor">
                                Get Started
                                <i className="fas fa-arrow-right ml-2 -mr-1"></i>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export const Feature = () => {
    return (
        <div id="features" className="px-8 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-44">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <svg
                            viewBox="0 0 52 24"
                            fill="currentColor"
                            className="absolute top-0 left-0 z-0  w-32 -mt-8 -ml-20 text-themeColor lg:w-32 lg:-ml-28 lg:-mt-10"
                        >
                            <defs>
                                <pattern
                                    id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                                    x="0"
                                    y="0"
                                    width=".135"
                                    height=".30"
                                >
                                    <circle cx="1" cy="1" r=".7" />
                                </pattern>
                            </defs>
                            <rect
                                fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                                width="52"
                                height="24"
                            />
                        </svg>
                        <span className="relative">What's &nbsp;</span>
                    </span>
                    Useful For Students
                </h2>
            </div>
            <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
                <div className="max-w-md sm:mx-auto sm:text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-100 sm:mx-auto sm:w-24 sm:h-24">
                        <i className="fas fa-robot text-3xl"></i>
                    </div>
                    <h6 className="mb-3 text-xl font-bold leading-5">A.I. Problem Solving</h6>
                    <p className="mb-3 text-sm text-gray-900">
                        Chat QA uses AI powered technology to deliver highly accurate answers to homework, quiz, and exam problems/questions.
                    </p>
                </div>
                <div className="max-w-md sm:mx-auto sm:text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-100 sm:mx-auto sm:w-24 sm:h-24">
                        <i className="fas fa-desktop text-3xl"></i>
                    </div>
                    <h6 className="mb-3 text-xl font-bold leading-5">Multi-Platform Compatibility</h6>
                    <p className="mb-3 text-sm text-gray-900">
                        The Chat QA extension seamlessly integrates with leading platforms including Canvas, McGraw Hill Connect & Smartbook, Blackboard and providing broad accessibility.
                    </p>
                </div>
                <div className="max-w-md sm:mx-auto sm:text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-100 sm:mx-auto sm:w-24 sm:h-24">
                        <i className="fas fa-brain text-3xl"></i>
                    </div>
                    <h6 className="mb-3 text-xl font-bold leading-5">Knowledge Reinforcement</h6>
                    <p className="mb-3 text-sm text-gray-900">
                        Each question and answer is accompanied by a comprehensive explanation, enabling students to further reinforce their understanding and enhance their learning experience.
                    </p>
                </div>
                <div className="max-w-md sm:mx-auto sm:text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-yellow-100 sm:mx-auto sm:w-24 sm:h-24">
                        <i className="fas fa-mask text-3xl"></i>
                    </div>
                    <h6 className="mb-3 text-xl font-bold leading-5">
                        Stealth Assistance
                    </h6>
                    <p className="mb-3 text-sm text-gray-900">
                        Chat QA operates in stealth mode, sitting on top of a student's platform rather than connecting to its API, ensuring students can use the tool with confidence, without fear of detection.
                    </p>
                </div>
            </div>
        </div>
    );
};