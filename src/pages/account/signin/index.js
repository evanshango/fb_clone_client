import React from 'react'
import './styles.css'
import SigninForm from "../../../components/home/signin/SigninForm"
import Footer from "../../../components/home/signin/Footer"
import SignupForm from "../../../components/home/signin/SignupForm"

const Signin = () => {
    return (
        <div className="signin">
            <div className="signin_wrapper">
                <SigninForm/>
                <SignupForm/>
                <Footer/>
            </div>
        </div>
    )
}

export default Signin
