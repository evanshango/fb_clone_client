import React, {useEffect} from "react"
import {Route, Routes} from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {useAppDispatch, useAppSelector} from "./store/store"
import {fetchUser} from "./pages/account/accountSlice"
import Home from "./pages/home"
import Profile from "./pages/profile"
import PrivateRoutes from "./routes/PrivateRoutes"
import {PublicRoutes} from "./routes/PublicRoutes"
import Signin from "./pages/account/signin"
import Reset from "./pages/reset"

const App = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.account)
    useEffect(() => dispatch(fetchUser()), [dispatch])

    return (
        <>
            <ToastContainer theme={'colored'} position={'bottom-right'} hideProgressBar/>
            <Routes>
                <Route path={'/profile'} exact element={<PrivateRoutes Component={Profile} user={user}/>}/>
                <Route path={'/activate/:token'} exact element={<PrivateRoutes Component={Home} user={user}/>}/>
                <Route path={'/'} exact element={<PrivateRoutes Component={Home} user={user}/>}/>
                <Route path={'/signin'} exact element={<PublicRoutes Component={Signin} user={user}/>}/>
                <Route path={'/forgot/password'} exact element={<Reset/>}/>
            </Routes>
        </>
    )
}

export default App
