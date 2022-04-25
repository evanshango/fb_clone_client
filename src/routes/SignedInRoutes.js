import {useAppSelector} from "../store/store"
import {Outlet} from "react-router-dom"
import Signin from "../pages/account/signin"

export const SignedInRoutes = () => {
    const {user} = useAppSelector(state => state.account)
    return user ? <Outlet/> : <Signin/>
}
