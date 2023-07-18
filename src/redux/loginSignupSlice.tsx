import { createSlice } from '@reduxjs/toolkit'
import { getUserDetailFromLocalStorage, getUserTokenInLocalStorage } from '../utils/localStorage'
const initialState = {

    // form start
    loginSignupForms: {
        isShowSignupForm: true,
        isShowLoginForm: true,
        isShowOtpForm: false,
        isShowVerifyForm: false,
        isShowForgotPasswordForm: false,
        isShowSetPasswordForm: false,
        isShowTwoFactorAuthForm: false,
    },
     // variables
     loginSignupVar: {
        isShowAccountVerifyMessage: false,
        isUserHasToken: getUserTokenInLocalStorage(),
        isShowPasswordResetMessage: false,
        userLocalData: getUserDetailFromLocalStorage()
    },
}

export const loginSignupSlice = createSlice({
    name: 'loginSignupSlice',
    initialState,
    reducers: {
        setForms: (state, action) => {
            state.loginSignupForms = {
                ...state.loginSignupForms,
                isShowSignupForm: action.payload.isShowSignupForm,
                isShowLoginForm: action.payload.isShowLoginForm,
                isShowOtpForm: action.payload.isShowOtpForm,
                isShowVerifyForm: action.payload.isShowVerifyForm,
                isShowForgotPasswordForm: action.payload.isShowForgotPasswordForm,
                isShowSetPasswordForm: action.payload.isShowSetPasswordForm,
                isShowTwoFactorAuthForm: action.payload.isShowTwoFactorAuthForm,
            }

        },
        setloginSignupVar: (state, action) => {
            state.loginSignupVar = {
                ...state.loginSignupVar,
                isUserHasToken: action.payload.isUserHasToken,
                isShowAccountVerifyMessage: action.payload.isShowAccountVerifyMessage,
                isShowPasswordResetMessage: action.payload.isShowPasswordResetMessage,

            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setForms,
    setloginSignupVar,

} = loginSignupSlice.actions
export default loginSignupSlice.reducer