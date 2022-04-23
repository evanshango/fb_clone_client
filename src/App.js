import React, {useEffect} from "react"
import {Route, Routes} from 'react-router-dom'
import Signin from "./pages/account/signin"
import Profile from "./pages/profile"
import Home from "./pages/home"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {useAppDispatch} from "./store/store"
import cookies from 'js-cookie'
import {setUser, STORAGE_KEY} from "./pages/account/accountSlice"

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (cookies.get(STORAGE_KEY)) dispatch(setUser(JSON.parse(cookies.get(STORAGE_KEY))))
    }, [dispatch])

    return (
        <div>
            <ToastContainer theme={'colored'} position={'bottom-right'} hideProgressBar/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/signin'} exact element={<Signin/>}/>
                <Route path={'/profile'} exact element={<Profile/>}/>
            </Routes>
        </div>
    )
}

export default App
