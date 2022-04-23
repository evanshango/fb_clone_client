import React, {useState} from 'react'
import {Form, Formik} from "formik"
import SigninInput from "../inputs/signin"
import {Link} from "react-router-dom"
import * as Yup from "yup"
import {useAppDispatch, useAppSelector} from "../../../store/store"
import {signinUser} from "../../../pages/account/accountSlice"
import {DotLoader} from "react-spinners"

const SigninForm = ({setVisible}) => {
    const signinInfo = {
        email: '',
        password: ''
    }
    const [signin, setSignin] = useState(signinInfo)
    const {email, password} = signin
    const dispatch = useAppDispatch()
    const {status} = useAppSelector(state => state.account)

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

    const handleSignin = async () => {
        try {
            await dispatch(signinUser(signin))
        } catch (e) {
            console.log("ERROR")
        }
    }

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
                            validationSchema={signinValidation} onSubmit={handleSignin}>
                        {() => (
                            <Form>
                                <SigninInput onChange={handleInputChange} type={'text'} name={'email'}
                                             placeholder={'Email address or Phone number'}/>
                                <SigninInput onChange={handleInputChange} placeholder={'Password'}
                                             type={'password'} name={'password'} bottom/>
                                <button type="submit" className="blue_btn" disabled={status !== 'idle'}>Signin</button>
                                {status !== 'idle' && (
                                    <>
                                        <br/>
                                        <DotLoader color={'#1876f2'} loading={status !== 'idle'} size={30}/>
                                        <br/>
                                    </>
                                )}
                            </Form>
                        )}
                    </Formik>
                    <Link to={'/forgot'} className="forgot_password">Forgotten Password?</Link>
                    <div className="sign_splitter"/>
                    <button className="blue_btn open_signup" type="button" onClick={() => setVisible(true)}>
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
