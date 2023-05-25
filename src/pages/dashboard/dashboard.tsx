import { NavLink, useNavigate } from "react-router-dom";
import moment from 'moment'
import { useEffect, useState } from "react";
import { useLazySubscriptionsQuery, useUpdateUserMutation } from "../../servicesRtkQuery/publicApi";

export default function Dashboard() {
    var userData: any = localStorage.getItem("chatQa_user");
    userData = JSON.parse(userData)
    const [selectedPlan, setSelectedPlan]: any = useState("Monthly ($14.99 / mo)");
    const navigate = useNavigate()

    const [trigger, result] = useLazySubscriptionsQuery()
    const { isSuccess, isFetching } = result
    const [plans, setPlans]: any = useState([])

    const [updateUser] = useUpdateUserMutation()
    const [deleteConfirm, setDeleteConfirm]: any = useState()

    useEffect(() => {
        trigger({})
    }, [])

    useEffect(() => {
        if (isSuccess && !isFetching) {
            setPlans(result?.data?.data)
        }
    }, [isSuccess, isFetching])

    const handleDelete = () => {
        if (deleteConfirm === "delete my account") {
            updateUser({
                payload: {
                    status: false
                },
                query: {
                    userId: userData?._id
                }
            }).then((data: any) => {
                if (data?.error) {
                }
                else {
                    localStorage.clear()
                    navigate("/")
                }
            })
        }
    }

    return (
        <div className="select-none">
            <div className="relative px-8 py-10 bg-white border-t border-gray-200 md:py-16 lg:py-10 xl:py-10 xl:px-0">
                <div className="container flex flex-col items-center h-full max-w-6xl mx-auto gap-5">
                    <div className="max-w-full mx-auto min-w-full">
                        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{userData?.name}</h5>
                            <hr />
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Joined on : {moment(userData?.createAt).format("DD-MM-YYYY")}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><i className="fas fa-envelope mr-2"></i>{userData?.email}</p>
                            <button className="btn" onClick={() => {
                                localStorage.clear()
                                navigate("/")
                            }}>Logout</button>
                        </div>
                    </div>

                    <div className="max-w-full mx-auto min-w-full">
                        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Upgrade for full access</h5>
                            <hr />
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Plan <span className="text-red-500">*</span></label>
                                    <div className="relative mt-2 dropdown w-full">
                                        <button type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                                            <span className="flex items-center">
                                                <i className="fas fa-calendar"></i>
                                                <span className="ml-3 block truncate">{selectedPlan}</span>
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                        <ul className="dropdown-content menu mt-1 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex={-1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                            {
                                                plans?.map((plan: any, index: any) => {
                                                    return (
                                                        <li key={index} className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" onClick={() => {
                                                            setSelectedPlan(plan?.name + " ($" + plan?.amount + ")")
                                                        }}>
                                                            <div className="flex items-center">
                                                                <span className="font-normal block truncate">{plan?.name}&nbsp;(${plan?.amount})</span>
                                                                {selectedPlan === plan?.name + " ($" + plan?.amount + ")" ?
                                                                    <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </span>
                                                                    : null
                                                                }
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Card Information <span className="text-red-500">*</span></label>
                                    <div className="form-control">
                                        <label className="input-group">
                                            <span><i className="far fa-credit-card"></i></span>
                                            <input type="text" placeholder="" className="input" />
                                        </label>
                                    </div>
                                </div>
                                <button className="btn w-full">Submit</button>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-full mx-auto min-w-full">
                        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Delete Account</h5>
                            <hr />
                            <div className="mt-4">
                                <label htmlFor="my-modal-3" className="btn w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white "><i className="fas fa-trash-alt mr-2"></i>Delete Account</label>
                            </div>
                            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box relative">
                                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                    <h3 className="font-bold text-lg">Delete Account</h3>
                                    <p className="py-4">Any active subscriptions will be immediately canceled (without a refund) and all your account data will be deleted. To confirm that you want to delete your account, please enter "delete my account" in the text field below.</p>
                                    <div>
                                        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Confirm Deletion<span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="delete my account" className="input input-bordered w-full" onChange={(e: any) => {
                                            setDeleteConfirm(e.target.value)
                                        }} />
                                    </div>
                                    <div className="modal-action">
                                        <label htmlFor="my-modal-3" className="btn">Cancel</label>
                                        <button className="btn bg-red-500 border-red-500" disabled={deleteConfirm !== "delete my account"} onClick={() => handleDelete()}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-full mx-auto min-w-full">
                        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Get Started With 3 Free Answer Credits</h5>
                            <hr />
                            <ol className="pl-5 mt-2 space-y-1 list-decimal flex flex-col gap-4">
                                <li>
                                    Download the <a href="/#" className="underline font-bold">Chat QA Chrome Extension</a><i className="glyphicon glyphicon-new-window"></i> on a desktop device
                                </li>
                                <li>
                                    Go to your learning platform and start your assignment
                                </li>
                                <li>Click on the Chat QA Chrome Extension to activate</li>
                                <li>Refresh your page for the Chat QA button to appear</li>
                                <li>When stuck, simply click the Chat QA button by your question or use our text selection feature and watch us deliver the answer and explanation.</li>
                            </ol>
                            <button className="btn w-full mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white ">
                                <span className="mr-2 css-1wh2kri"><svg viewBox="0 0 190.5 190.5" height="22" width="22" focusable="false" className="chakra-icon css-1abm4xl" aria-hidden="true"><g transform="translate(90.669 -507.469)"><path d="M4.583 650.342c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z" fill="#fff" clipPath="none" mask="none"></path><path d="M-36.664 626.539l-41.24-71.43c-8.362 14.479-12.765 30.904-12.765 47.625s4.401 33.146 12.762 47.625 20.387 26.503 34.868 34.86 30.908 12.755 47.628 12.75l41.24-71.43v-.011c-4.177 7.244-10.188 13.26-17.428 17.443a47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z" fill="#229342" clipPath="none" mask="none"></path><path d="M45.826 626.536l-41.239 71.43c16.72.003 33.146-4.398 47.626-12.757s26.504-20.384 34.863-34.865a95.24 95.24 0 0 0 12.755-47.627c-.003-16.72-4.408-33.145-12.772-47.623H4.58l-.01.007a47.62 47.62 0 0 1 23.819 6.372c7.243 4.179 13.257 10.19 17.439 17.431a47.62 47.62 0 0 1-.001 47.633z" fill="#fbc116" clipPath="none" mask="none"></path><path d="M4.583 640.43c20.824 0 37.705-16.881 37.705-37.706s-16.881-37.705-37.705-37.705-37.705 16.881-37.705 37.705 16.881 37.706 37.705 37.706z" fill="#1a73e8" clipPath="none" mask="none"></path><path d="M4.583 555.097h82.479c-8.358-14.481-20.381-26.507-34.861-34.868a95.23 95.23 0 0 0-47.625-12.76c-16.72.001-33.145 4.404-47.623 12.767a95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633c4.179-7.242 10.193-13.256 17.434-17.436s15.456-6.381 23.818-6.379z" fill="#e33b2e" clipPath="none" mask="none"></path></g></svg></span><span className="css-124juzh"></span>
                                Go to Chrome Extenstion</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="px-4 pt-12 pb-8 text-white bg-white border-t border-gray-200">
                <div className="container flex flex-col justify-between max-w-6xl px-4 mx-auto overflow-hidden lg:flex-row">
                    <div className="w-full pl-12 mr-4 text-left lg:w-1/4 sm:text-center sm:pl-0 lg:text-left">
                        <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 md:mx-auto">
                            <span className="relative">
                                <svg viewBox="0 0 52 24" fill="currentColor" className="absolute top-0 left-0 z-0 w-32 -mt-3 text-yellow-300">
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
                                        height="20" />
                                </svg>
                                <a href="/#" className="relative flex items-center h-full font-black leading-none -ml-5">
                                    <span className="ml-3 text-2xl text-gray-800">Chat</span><img src="../../assets/images/logo.png" className="w-14 h-14" alt="" />
                                </a>
                            </span>
                        </h2>
                        <p className="mt-6 mr-4 text-base text-gray-500">Crafting the next-level of user experience and engagement.
                        </p>
                    </div>
                    <div className=" w-full pl-10 mt-6 text-sm lg:w-3/4 grid grid-cols-2 md:grid-cols-4 lg:mt-0">
                        <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
                            <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
                                Product</li>
                            <li><a href="#features"
                                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600">Features</a>
                            </li>
                            <li><a href="#howitworks"
                                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600">How It Works</a>
                            </li>
                            <li><a href="#pricing"
                                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600">Pricing</a>
                            </li>
                        </ul>
                        <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
                            <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
                                Company</li>
                            <li><a href="#_"
                                className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600">Privacy</a>
                            </li>
                            <li><a href="#_" className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600">Terms
                                of
                                Service</a></li>
                        </ul>
                        <ul className="flex flex-col w-full p-0 font-medium text-left text-gray-700 list-none">
                            <li className="inline-block px-3 py-2 mt-5 font-bold tracking-wide text-gray-800 uppercase md:mt-0">
                                PLATFORM
                            </li>
                            <li>
                                <NavLink to="/login"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600">Login</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signup"
                                    className="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600">Sign Up</NavLink>
                            </li>
                        </ul>
                        <div className="flex flex-col w-full text-gray-700">
                            <div className="inline-block px-3 py-2 mt-5 font-bold text-gray-800 uppercase md:mt-0">Follow Us</div>
                            <div className="flex justify-start pl-4 mt-2">
                                <a className="flex items-center mr-6 text-gray-400 no-underline hover:text-gray-600"
                                    target="_blank" rel="noopener noreferrer" href="/#">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current hover:text-blue-500" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" />
                                    </svg>
                                </a>
                                <a className="flex items-center mr-6 text-gray-400 no-underline hover:text-gray-600"
                                    target="_blank" rel="noopener noreferrer" href="/#">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current hover:text-blue-400" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                                    </svg>
                                </a>
                                <a className="flex items-center text-gray-400 no-underline hover:text-gray-600"
                                    target="_blank" rel="noopener noreferrer" href="/#">
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-4 mt-10 text-center text-gray-400 border-t border-gray-100">© 2023 Chat QA. All rights
                    reserved.</div>
            </footer>
        </div >
    )
}