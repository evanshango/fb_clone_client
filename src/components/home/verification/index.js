import './styles.css'
import React from 'react'
import {useAppDispatch, useAppSelector} from "../../../store/store"
import {verifyLink} from "../../../pages/account/accountSlice"

const Verification = () => {
    const dispatch = useAppDispatch()
    const {message} = useAppSelector(state => state.account)
    return (
        <div className="send_verification">
            <span>Please verify your account by clicking on the link sent to you email address</span>
            {!message && (
                <span className="send" onClick={() => dispatch(verifyLink())}>
                    Click here to resend verification email
                </span>
            )}
            {message && <div className="success_text">{message}</div>}
        </div>
    )
}

export default Verification
