import React, {useEffect} from "react"
import {useAppDispatch} from "../../store/store"
import {clearMessage, clearSearch, requestCode} from "./userSlice"

const SendEmail = ({message, setVisible, user, status}) => {
    const dispatch = useAppDispatch()

    const cancelRequest = () => {
        dispatch(clearSearch())
        setVisible(0)
    }

    const requestEmail = () => {
        message && message !== '' && dispatch(clearMessage())
        dispatch(requestCode({email: user?.email}))
    }

    useEffect(() => {
        if (message.includes('Success')) {
            setTimeout(() => {
                setVisible(2)
                dispatch(clearMessage())
            }, 2000)
        }
    }, [message, dispatch, setVisible])

    return (
        <div className="reset_form dynamic_height send_email_form">
            <div className="reset_form_header">Reset your Password</div>
            <div className="reset_grid">
                <div className="reset_left">
                    <div className="reset_form_text">
                        How do you want to receive the code to reset your password
                    </div>
                    <label htmlFor="email" className="hover2">
                        <input type="radio" id="email" checked readOnly/>
                        <div className="label_col">
                            <span>Send code via email</span>
                            <span>{user?.email}</span>
                        </div>
                    </label>
                </div>
                <div className="reset_right">
                    <img src={user?.picture} alt={user?.username}/>
                    <span>{user?.email}</span>
                    <span>Facebook-Clone user</span>
                </div>
            </div>
            <div className="reset_form_buttons">
                <button type="button" className="gray_btn" onClick={cancelRequest}>Not You?</button>
                <button type="submit" className="blue_btn" disabled={status !== 'idle' || message.includes('Success')}
                        onClick={requestEmail}>
                    Continue
                </button>
            </div>
            {message && message !== '' && (
                <div style={{textAlign: 'center', color: 'green'}}>
                    {message}
                </div>
            )}
        </div>
    )
}

export default SendEmail
