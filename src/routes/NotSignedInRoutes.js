import {Outlet, Navigate} from "react-router-dom"
import {useAppSelector} from "../store/store"

export const NotSignedInRoutes = () => {
    const {user} = useAppSelector(state => state.account)
    return user ? <Navigate to={'/'}/> : <Outlet/>
}
