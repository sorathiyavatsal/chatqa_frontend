import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setApiError } from '../redux/globalSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API,
    prepareHeaders: (headers) => {
        const getToken:any = localStorage.getItem("chatQa_token");
        const token = JSON.parse(getToken);
        headers.set("Authorization", `Bearer ${token.token}`);
        return headers;
    },
});
const baseQueryWithReauth = async (args:any, api:any, extraOptions:any) => {
    let result:any = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // alert('You are unathorized. please login again')
        localStorage.clear();
        window.location.reload();
        return
    }

    if (result.error && result.error.originalStatus > 499) {
        const query: any = {
            isShowError: Math.random(),
            statusCode: result?.error?.originalStatus
        }
        api.dispatch(setApiError(query))
        return
    }
    
    return result;
};

export const userApiSlice = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        changePassword: builder.query({
            query: (payload) => ({
                url: 'change-password',
                method: 'POST',
                body: payload
            })
        }),
        logout: builder.query({
            query: () => ({
                url: 'logout',
                method: 'GET',
            })
        }),
        editProfile: builder.query({
            query: (payload) => ({
                url: 'user-update',
                method: 'PUT',
                body: payload
            })
        }),
        userActivity: builder.mutation({
            query: (payload) => ({
                url: 'user-activity',
                method: 'POST',
                body: payload
            })
        }),
    })
})

export const {
    useLazyChangePasswordQuery, useLazyLogoutQuery,
    useLazyEditProfileQuery, useUserActivityMutation
} = userApiSlice