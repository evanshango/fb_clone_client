import React, {useEffect} from 'react'
import {Form, Formik} from "formik"
import SigninInput from "../../components/home/inputs/signin"
import {Link} from "react-router-dom"
import * as Yup from 'yup'
import {useAppDispatch} from "../../store/store"
import {clearMessage, findUser} from "./userSlice"

const SearchAccount = ({message, email, setEmail, setVisible, status}) => {
    const dispatch = useAppDispatch()
    const validateEmail = Yup.object({
        email: Yup.string()
            .required('Email address is required')
            .email('Must be a valid email address')
    })
    useEffect(() => {
        message && message.includes('found') && setVisible(1)
    }, [message, setVisible])
    const handleSearch = () => {
        message && message !== '' && dispatch(clearMessage())
        dispatch(findUser(email))
    }
    return (
        <div className="reset_form">
            <div className="reset_form_header">Find your Account</div>
            <div className="reset_form_text">
                Please enter your email address or mobile number to search for your account.
            </div>
            <Formik enableReinitialize initialValues={{email}}
                    validationSchema={validateEmail} onSubmit={handleSearch}>
                {() => (
                    <Form>
                        <SigninInput onChange={(e) => setEmail(e.target.value)} type={'text'} name={'email'}
                                     placeholder={'Email address or Phone number'}/>
                        {message && message !== '' && <div className="error_text">{message}</div>}
                        <div className="reset_form_buttons">
                            <Link to={'/signin'} className="gray_btn">Cancel</Link>
                            <button type="submit" className="blue_btn"
                                    disabled={status !== 'idle' || email === ''}>
                                Search
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SearchAccount
