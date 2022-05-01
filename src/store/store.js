import {configureStore} from "@reduxjs/toolkit"
import {accountSlice} from "../pages/account/accountSlice"
import {useDispatch, useSelector} from "react-redux"
import {userSlice} from "../pages/reset/userSlice"

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        user: userSlice.reducer
    }
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
