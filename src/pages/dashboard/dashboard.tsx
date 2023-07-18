/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useLocation } from "react-router-dom";
import moment from 'moment'
import { Children, useEffect, useState } from "react";
import { useLazySubscriptionsQuery, useUpdateUserMutation, useAdduserPlanMutation, useLazyGetUserPlanQuery, useLazyUserQuery } from "../../servicesRtkQuery/publicApi";
import Footer from "../../components/footer";
import { Fireworks } from 'fireworks/lib/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Select from 'react-select';
import { setUserInLocalStorage } from "../../utils/localStorage";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/UserDetailsSlice";
import UserDetailsSlice from '../../redux/UserDetailsSlice';
import '../../all.min.css'
export default function Dashboard() {
    const dispatch = useDispatch()
    var userData: any = localStorage.getItem("chatQa_user");
    userData = JSON.parse(userData)
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');
    const navigate = useNavigate()

    const [trigger, result] = useLazySubscriptionsQuery()
    const { isSuccess, isFetching } = result
    const [getuserPlan, UserPlanResult] = useLazyGetUserPlanQuery()
    const { isSuccess: isUsuccess, isLoading: isUFetching, } = UserPlanResult
    const [payment, paymentResult] = useAdduserPlanMutation()
    const { isSuccess: isPAsuccess, isLoading: isPAFetching, isError, error } = paymentResult
    const [user, userResult] = useLazyUserQuery();
    const { isSuccess: isUssuccess, isLoading: isUsFetching, } = userResult
    const [updateUser] = useUpdateUserMutation()

    const [plans, setPlans]: any = useState([])
    const [userPlan, setUserPlan]: any = useState([]);
    const [cracker, setCracker] = useState(false);
    const [deleteConfirm, setDeleteConfirm]: any = useState()
    const [open, setOpen]: any = useState(false);
    const [errors, setError]: any = useState();
    const [selectedPlan, setSelectedPlan]: any = useState("");
    const [disabled, setDisabled]: any = useState();

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setOpen(false)
        setCracker(false)
    };
    let fxProps: any = {
        count: 3,
        interval: 200,
        bubbleSizeMinimum: 5,
        bubbleSizeMaximum: 10,
        canvasTopOffset: 50,
        colors: ['#fbdf02', '#4CAF50', '#dc3545'],
        calc: (props: any, i: any) => ({
            ...props,
            x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
            y: 100 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
    }
    useEffect(() => {
        trigger({})
        getuserPlan({})
        user({ userId: userData?._id })
    }, [])
    useEffect(() => {
        if (isSuccess && !isFetching) {
            let record: any = []
            result?.data?.data.map((item: any) => {
                record.push({
                    value: item?._id, label: item.name + " ($" + item.amount + ")"
                })
                if (item?._id === id) {
                    setSelectedPlan({
                        value: item?._id, label: item.name + " ($" + item.amount + ")"
                    })
                }
                return item
            })
            setPlans(record)
        }
    }, [isSuccess, isFetching])
    useEffect(() => {
        if (isUsuccess && !isUFetching) {
            let userPlanData: any = UserPlanResult?.data?.data.filter((item: any) => item?.userId === userData?._id && item?.isActive === true )
            setUserPlan(userPlanData)
        }
    }, [isUsuccess, isUFetching, UserPlanResult])
    useEffect(() => {
        if (!isUsFetching && isUssuccess) {
            dispatch(setUser(userResult?.data?.data?.[0]?.users?.[0]))
            setUserInLocalStorage(userResult?.data?.data?.[0]?.users?.[0])
        }
    }, [isUsFetching, isUssuccess, userResult])
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
    var amount = result?.data?.data?.filter((item: any) => item._id === selectedPlan?.value)
    const stripe: any = useStripe()
    const elements: any = useElements()
    const appearance = {
        theme: 'stripe'
      };

    const handelSubmit = async () => {
        setDisabled(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if (paymentMethod) {
            const { id } = paymentMethod
            var payload = {
                amount: amount[0]?.amount,
                userId: userData._id,
                planId: selectedPlan?.value,
                transactionId: id,
                totalPoints: amount[0]?.points,
                day: amount[0]?.day
            }
            payment(payload)
            setError(error)
        }
        else {
            setDisabled(false)
        }
    }
    useEffect(() => {
        if (isPAsuccess && !isPAFetching) {
            onOpenModal()
            setCracker(true)
            setDisabled(false)
            getuserPlan({})
            user({ userId: userData?._id })
        }
    }, [isPAFetching, isPAsuccess])
    useEffect(() => {
        if (isError) {
            setError(error)
            setDisabled(false)
        }
    }, [isError])

    return (
        <div className="select-none">
            <div className="relative px-8 py-10 bg-white border-t border-gray-200 md:py-16 lg:py-10 xl:py-10 xl:px-0">
                {
                    cracker ? <div style={{ position: 'fixed' }}>
                        <Fireworks {...fxProps} />
                    </div> : null
                }
                <div className="flex flex-col items-center h-full max-w-6xl mx-auto gap-5">
                    <div className="max-w-full mx-auto min-w-full">
                        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{userData?.name}</h5>
                            <hr />
                            <p className="mb-3 font-normal text-gray-700">Joined on : {moment(userData?.createAt).format("DD-MM-YYYY")}</p>
                            <p className="mb-3 font-normal text-gray-700"><i className="fas fa-envelope mr-2"></i>{userData?.email}</p>
                            <button type="button" onClick={() => {
                                localStorage.clear()
                                navigate("/")
                            }} className="btn self-start w-auto mx-auto mt-0 text-base font-bold text-black border-0 fold-bold lg:mx-0 flex items-center hover:text-white bg-themeColor">
                                <div>Logout</div>
                            </button>
                        </div>
                    </div>
                    <div className="max-w-full mx-auto min-w-full">
                        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Upgrade for full access</h5>
                            <hr />
                            {
                                userPlan && userPlan?.length !== 0  ? <div className="overflow-x-auto">
                                    <table className="table bg-white">
                                        <tbody>
                                            <tr>
                                                <th>Plan Details  </th>
                                                <td>{userPlan?.[0]?.userPlan?.[0]?.name + " ($" + userPlan?.[0]?.amount + ")"}</td>
                                            </tr>
                                            <tr>
                                                <th>Expiry Date  </th>
                                                <td>{userPlan?.[0]?.endDate}</td>
                                            </tr>
                                            <tr>
                                                <th>Used Points </th>
                                                <td>{userPlan?.[0]?.points}</td>
                                            </tr>
                                            <tr>
                                                <th>Total Points </th>
                                                <td>{userPlan?.[0]?.totalPoints}</td>
                                            </tr>
                                            <tr>
                                                <th>Transaction Id </th>
                                                <td>{userPlan?.[0]?.transactionId}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> : <div className="flex flex-col gap-5">
                                    <div>
                                        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Plan <span className="text-red-500">*</span></label>
                                        <div className="relative mt-2 dropdown w-full">
                                            <Select
                                                options={plans}
                                                isSearchable
                                                placeholder="Type or selects Plan here..."
                                                name='gender'
                                                onChange={(e: any) => {
                                                    if (e) {
                                                        setSelectedPlan(e);
                                                    }
                                                }}
                                                value={selectedPlan}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <CardElement className="bg-white rounded-md focus:outline-none  p-3" />
                                    </div>
                                    <button className="btn w-full" onClick={() => {
                                        handelSubmit()
                                    }}
                                        disabled={disabled}>{disabled ? <i className="fa-solid fa-spinner animate-spin mr-2 text-lg"></i> : null}Payment</button>
                                    <span className="text-red text-sm md:text-lg ">{errors}</span>
                                </div>
                            }
                            <input type="checkbox" checked={open} id="my-modal-2" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box bg-white relative">
                                    <div className="flex items-center justify-between p-1">
                                        <h2 className="text-black font-bold text-2xl text-center ">Plan Details</h2>
                                        <label htmlFor="my-modal-2" className="btn btn-sm btn-circle" onClick={() => { onCloseModal() }}>✕</label>
                                    </div>
                                    <hr />
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <tbody >
                                                <tr>
                                                    <th>Plan Details  </th>
                                                    <td>{userPlan?.[0]?.userPlan?.[0]?.name + " ($" + userPlan?.[0]?.amount + ")"}</td>
                                                </tr>
                                                <tr>
                                                    <th>Expiry Date  </th>
                                                    <td>{userPlan?.[0]?.endDate}</td>
                                                </tr>
                                                <tr>
                                                    <th>Used Points </th>
                                                    <td>{userPlan?.[0]?.points}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total Points </th>
                                                    <td>{userPlan?.[0]?.totalPoints}</td>
                                                </tr>
                                                <tr>
                                                    <th>Transaction Id </th>
                                                    <td>{userPlan?.[0]?.transactionId}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-full mx-auto min-w-full">
                        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow ">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Delete Account</h5>
                            <hr />
                            <div className="mt-4">
                                <label htmlFor="my-modal-3" className="btn w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 border-red-500"><i className="fas fa-trash-alt mr-2"></i>Delete Account</label>
                            </div>
                            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box relative">
                                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                    <h3 className="font-bold text-lg">Delete Account</h3>
                                    <p className="py-4">Any active subscriptions will be immediately canceled (without a refund) and all your account data will be deleted. To confirm that you want to delete your account, please enter <b>"delete my account"</b> in the text field below.</p>
                                    <div>
                                        <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900">Confirm Deletion<span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="delete my account" className="input input-bordered w-full" onChange={(e: any) => {
                                            setDeleteConfirm(e?.target?.value)
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
                        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow ">
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
            <Footer />
        </div >
    )
}