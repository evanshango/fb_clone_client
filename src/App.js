import React, {useEffect} from "react"
import {Route, Routes} from 'react-router-dom'
import Signin from "./pages/account/signin"
import Profile from "./pages/profile"
import Home from "./pages/home"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {useAppDispatch} from "./store/store"
import {fetchUser} from "./pages/account/accountSlice"
import {SignedInRoutes} from "./routes/SignedInRoutes"
import {NotSignedInRoutes} from "./routes/NotSignedInRoutes"

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => dispatch(fetchUser()), [dispatch])

    return (
        <div>
            <ToastContainer theme={'colored'} position={'bottom-right'} hideProgressBar/>
            <Routes>
                <Route element={<SignedInRoutes/>}>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/profile'} exact element={<Profile/>}/>
                </Route>
                <Route element={<NotSignedInRoutes/>}>
                    <Route path={'/signin'} exact element={<Signin/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
