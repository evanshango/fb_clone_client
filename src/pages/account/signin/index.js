import React, {useState} from 'react'
import './styles.css'
import SigninForm from "../../../components/home/signin/SigninForm"
import Footer from "../../../components/home/signin/Footer"
import SignupForm from "../../../components/home/signin/SignupForm"

const Signin = () => {
    const [visible, setVisible] = useState(false)
    return (
        <div className="signin">
            <div className="signin_wrapper">
                <SigninForm setVisible={setVisible}/>
                {visible && <SignupForm setVisible={setVisible}/>}
                <Footer/>
            </div>
        </div>
    )
}

export default Signin
