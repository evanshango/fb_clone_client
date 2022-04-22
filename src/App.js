import React from "react"
import {Route, Routes} from 'react-router-dom'
import Signin from "./pages/account/signin"
import Profile from "./pages/profile"
import Home from "./pages/home"

const App = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/signin'} exact element={<Signin/>}/>
                <Route path={'/profile'} exact element={<Profile/>}/>
            </Routes>
        </div>
    )
}

export default App
