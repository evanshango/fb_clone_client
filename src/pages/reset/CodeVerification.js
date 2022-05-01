import React, {useEffect} from 'react'
import {Form, Formik} from "formik"
import SigninInput from "../../components/home/inputs/signin"
import * as Yup from "yup"
import {useAppDispatch} from "../../store/store"
import {clearMessage, validateCode} from "./userSlice"

const CodeVerification = ({setVisible, message, code, setCode, email, status}) => {
    const dispatch = useAppDispatch()
    const validCode = Yup.object({
        code: Yup.string()
            .required('Please enter the code sent to your email address')
            .min(5, 'Code must be 5 characters').max(5, 'Code must be 5 characters')
    })
    const handleValidateCode = () => {
        message && message !== '' && dispatch(clearMessage())
        dispatch(validateCode({email, code}))
    }

    useEffect(() => {
        if (message && message !== '' && message.includes('verified successfully')) {
            setTimeout(() => {
                dispatch(clearMessage())
                setVisible(3)
            }, 1500)
        }
    }, [message, dispatch, setVisible, code])

    return (
        <div className="reset_form">
            <div className="reset_form_header">Code Verification</div>
            <div className="reset_form_text">
                Please enter the code that has been sent to your email address.
            </div>
            <Formik enableReinitialize initialValues={{code}}
                    validationSchema={validCode} onSubmit={handleValidateCode}>
                {() => (
                    <Form>
                        <SigninInput onChange={(e) => setCode(e.target.value)} type={'text'} name={'code'}
                                     placeholder={'Code'}/>
                        {message && message !== '' && <div className="success_text">{message}</div>}
                        <div className="reset_form_buttons">
                            <button type="button" className="gray_btn" onClick={() => setVisible(1)}>Cancel</button>
                            <button type="submit" className="blue_btn"
                                    disabled={status !== 'idle' || message.includes('verified successfully')}>
                                Continue
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CodeVerification
