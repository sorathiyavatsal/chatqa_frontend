import { configureStore } from '@reduxjs/toolkit'
import loginSignupReducer from './loginSignupSlice'
import globalReducer from './globalSlice'
import { userApiSlice } from '../servicesRtkQuery/userApi'
import { publicApiSlice } from '../servicesRtkQuery/publicApi'
export const store = configureStore({
    reducer: {
        loginSignupReducer,
        globalReducer,
        [publicApiSlice.reducerPath]: publicApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            userApiSlice.middleware,
            publicApiSlice.middleware,
        ),
})

