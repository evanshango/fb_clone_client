import React, {useEffect} from 'react'
import {Form, Formik} from "formik"
import SigninInput from "../../components/home/inputs/signin"
import * as Yup from "yup"
import {useAppDispatch} from "../../store/store"
import {clearMessage, resetPass} from "./userSlice"
import {useNavigate} from "react-router-dom"
import {signout} from "../account/accountSlice"

const ChangePassword = ({setVisible, msg, password, status, setPassword, confirmPass, email, setConfirmPass, user}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const validatePassword = Yup.object({
        password: Yup.string().required('Please provide your new password')
            .min(6, 'Password must be at least 6 characters long')
            .max(36, "Password can't be more than 36 characters long"),
        confirmPass: Yup.string().required('Password Confirmation is required')
            .oneOf([Yup.ref('password')], 'New Password and Confirm Password must match')
    })
    const handleSubmit = () => {
        msg && msg !== '' && dispatch(clearMessage())
        dispatch(resetPass({email, password}))
    }

    useEffect(() => {
        if (msg && msg !== '' && msg.includes('reset successful')) {
            setTimeout(() => {
                user && dispatch(signout())
                dispatch(clearMessage())
                navigate('/signin')
            }, 1500)
        }
    }, [msg, dispatch, navigate, user])

    return (
        <div className="reset_form change_pass">
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">
                Please enter your new Password.
            </div>
            <Formik enableReinitialize initialValues={{password, confirmPass}}
                    validationSchema={validatePassword} onSubmit={handleSubmit}>
                {() => (
                    <Form>
                        <SigninInput onChange={(e) => setPassword(e.target.value)} type={'password'} name={'password'}
                                     placeholder={'New Password'}/>
                        <SigninInput onChange={(e) => setConfirmPass(e.target.value)} type={'password'}
                                     name={'confirmPass'} placeholder={'Confirm Password'}/>
                        {msg && msg !== '' && <div className="success_text">{msg}</div>}
                        <div className="reset_form_buttons">
                            <button type="button" className="gray_btn" onClick={() => setVisible(2)}>Cancel</button>
                            <button type="submit" className="blue_btn"
                                    disabled={status !== 'idle' || msg.includes('reset successful')}>
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ChangePassword
