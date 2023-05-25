import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setApiError } from '../redux/globalSlice';
import { getUserRefreshTokenInLocalSorage, getUserTokenInLocalSorage, setUserTokenInLocalSorage } from '../utils/localStorage';
import Swal from 'sweetalert2';

let time_zone = (new Date().toString().substring(new Date().toString().indexOf('+') + 0)).slice(0, 5);
time_zone = time_zone.substring(0, 3) + ':' + time_zone.substring(3);


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API,
    prepareHeaders: (headers) => {
        headers.set("Authorization", getUserTokenInLocalSorage() ? getUserTokenInLocalSorage() : `Basic ${process.env.REACT_APP_BASE_TOKEN}`);
        return headers;
    },
});

const baseQueryForRefreshToken = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API,
    prepareHeaders: (headers) => {
        headers.set("Authorization", `Basic ${process.env.REACT_APP_BASE_TOKEN}`);
        return headers;
    },
});

const baseQueryMiddleware = async (args: any, api: any, extraOptions: any) => {
    let result: any = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === "FETCH_ERROR") {
        Swal.fire({
            toast: true,
            icon: 'error',
            title: "Something went wrong!\nPlease contact the administrator.",
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        })
        // localStorage.clear();
        return
    }
    if (result.error && result.error.status === 401) {
        //generate new access token 
        const refreshResult = await baseQueryForRefreshToken({
            url: '/auth/accessToken', method: 'POST', body: {
                token: getUserRefreshTokenInLocalSorage(),
            },
        }, api, extraOptions)

        //check token result
        if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
            setUserTokenInLocalSorage(result.data.data)
        } else {
            localStorage.clear();
            window.location.reload();
            return
        }
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


export const publicApiSlice = createApi({
    reducerPath: 'publicApi',
    baseQuery: baseQueryMiddleware,
    endpoints: builder => ({
        login: builder.query({
            query: (payload) => ({
                url: 'login',
                method: 'POST',
                body: payload
            })
        }),
        signUp: builder.query({
            query: (payload) => ({
                url: 'signup',
                method: 'POST',
                body: payload
            })
        }),
        user: builder.query({
            query: () => ({
                url: 'user',
                method: 'GET'
            })
        }),
        addUser: builder.mutation({
            query: (payload) => ({
                url: 'user',
                method: 'POST',
                body: payload
            })
        }),
        updateUser: builder.mutation({
            query: (payload) => ({
                url: `user?userId=${(payload.query.userId)}`,
                method: 'PATCH',
                body: payload.payload
            })
        }),
        subscriptions: builder.query({
            query: (payload) => ({
                url: 'subscriptionPlan',
                method: 'GET',
                params: payload
            })
        }),

    })
})

export const {
    useLazyLoginQuery, useLazySignUpQuery, useLazyUserQuery, useAddUserMutation, useUpdateUserMutation,useLazySubscriptionsQuery
} = publicApiSlice