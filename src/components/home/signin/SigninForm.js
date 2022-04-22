import React, {useState} from 'react'
import {Form, Formik} from "formik"
import SigninInput from "../inputs/signin"
import {Link} from "react-router-dom"
import * as Yup from "yup"

const SigninForm = () => {
    const signinInfo = {
        email: '',
        password: ''
    }
    const [signin, setSignin] = useState(signinInfo)
    const {email, password} = signin

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setSignin({...signin, [name]: value})
    }

    const signinValidation = Yup.object({
        email: Yup.string().required('Email or Phone Number is required')
            .email("Must be a valid email")
            .max(30, 'Email exceeded maximum characters'),
        password: Yup.string().required('Password is required')
    })
    return (
        <div className="signin_wrap">
            <div className="signin_1">
                <img src={'../../icons/facebook.svg'} alt="fb_logo"/>
                <span>
                            <p>Connect with friends and the world around you on Facebook-Clone.</p>
                        </span>
            </div>
            <div className="signin_2">
                <div className="signin_2_wrap">
                    <Formik enableReinitialize initialValues={{email, password}}
                            validationSchema={signinValidation}>
                        {(formik) => (
                            <Form>
                                <SigninInput onChange={handleInputChange} type={'text'} name={'email'}
                                             placeholder={'Email address or Phone number'}/>
                                <SigninInput onChange={handleInputChange} placeholder={'Password'}
                                             type={'password'} name={'password'} bottom/>
                                <button type={'submit'} className="blue_btn">Signin</button>
                            </Form>
                        )}
                    </Formik>
                    <Link to={'/forgot'} className="forgot_password">Forgotten Password?</Link>
                    <div className="sign_splitter"/>
                    <button className="blue_btn open_signup">
                        Create Account
                    </button>
                </div>
                <Link to={'/'} className="sign_extra">
                    <b>Create a Page</b> for a celebrity, brand or business
                </Link>
            </div>
        </div>
    )
}

export default SigninForm
