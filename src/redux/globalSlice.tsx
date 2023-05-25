import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    errorMessages: {},
    successMessages: {},
    apiError: {
        isShowError: "",
        statusCode: ""
    }
}

const reducers = {
    setErrorMessage: (state:any, action:any) => {
        state.errorMessages = action.payload
    },
    setSuccessMessage: (state:any, action:any) => {
        state.successMessages = action.payload
    },
    setApiError: (state:any, action:any) => {
        state.apiError = action.payload
    },

}
export const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: reducers,
})

// Action creators are generated for each case reducer function
export const { setErrorMessage, setSuccessMessage, setApiError } = globalSlice.actions
export default globalSlice.reducer