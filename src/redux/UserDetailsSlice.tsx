import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    User: [],
}

export const UserDetailsSlice = createSlice({
    name: 'UserDetails',
    initialState,
    reducers: {
        setUser: (state: any, action) => {
            state.User = action.payload
            console.log(state.User, "------>")
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setUser,
} = UserDetailsSlice.actions
export default UserDetailsSlice.reducer