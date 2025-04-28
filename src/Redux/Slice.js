import { createSlice } from '@reduxjs/toolkit'


function getCookie(){
    console.log(document.cookie);
    if(document.cookie && document.cookie.includes("admin"))return true
    return false
    
}

export const AdminSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: getCookie(),
    },
    reducers: {
        changeLoginStatus: (state , actions) => {
           state.isLoggedIn = actions.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const {changeLoginStatus} = AdminSlice.actions

export default AdminSlice.reducer