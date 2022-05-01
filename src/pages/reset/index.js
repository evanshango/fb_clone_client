import './styles.css'
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../store/store"
import {signout} from "../account/accountSlice"
import React, {useState} from "react"
import SearchAccount from "./SearchAccount"
import SendEmail from "./SendEmail"
import CodeVerification from "./CodeVerification"
import Footer from "../../components/home/signin/Footer"
import ChangePassword from "./ChangePassword"

const Reset = () => {
    const dispatch = useAppDispatch()
    const {user: signedInUser} = useAppSelector(state => state.account)
    const {user, message, status} = useAppSelector(state => state.user)

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [visible, setVisible] = useState(0)

    return (
        <div className="reset">
            <div className="reset_header">
                <img src={'../../../icons/facebook.svg'} alt="logo" className="logo"/>
                {signedInUser ? (
                    <div className="right_reset">
                        <Link to={'/profile'}>
                            <img src={signedInUser?.picture} alt={signedInUser?.firstName}/>
                        </Link>
                        <button className="blue_btn" onClick={() => dispatch(signout())}>Signout</button>
                    </div>
                ) : (
                    <Link to={'/signin'} className="right_reset">
                        <button className="blue_btn">Signin</button>
                    </Link>
                )}
            </div>
            <div className="reset_wrap">
                {visible === 0 && (
                    <SearchAccount message={message} email={email} setEmail={setEmail} setVisible={setVisible}
                                   status={status}
                    />
                )}
                {visible === 1 && user && (
                    <SendEmail message={message} setVisible={setVisible} user={user} status={status}/>
                )}
                {visible === 2 && (
                    <CodeVerification setVisible={setVisible} message={message} code={code} setCode={setCode}
                                      email={user.email} status={status}
                    />
                )}
                {visible === 3 && (
                    <ChangePassword setVisible={setVisible} msg={message} password={password} status={status}
                                    setPassword={setPassword} confirmPass={confirmPass} email={user.email}
                                    setConfirmPass={setConfirmPass} user={signedInUser}
                    />
                )}
            </div>
            <Footer/>
        </div>
    )
}

export default Reset
