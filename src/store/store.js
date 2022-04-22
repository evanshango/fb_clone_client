import {configureStore} from "@reduxjs/toolkit"
import {accountSlice} from "../pages/account/accountSlice"
import {useDispatch, useSelector} from "react-redux"

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer
    }
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
