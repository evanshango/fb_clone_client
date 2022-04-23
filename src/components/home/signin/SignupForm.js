import React, {useState} from 'react'
import {Form, Formik} from "formik"
import SignupInput from "../inputs/signup"
import * as Yup from "yup"
import DobSelect from "./DobSelect"
import GenderSelect from "./GenderSelect"
import {useAppDispatch, useAppSelector} from "../../../store/store"
import {resetState, signupUser} from "../../../pages/account/accountSlice"
import {DotLoader} from "react-spinners"

const SignupForm = ({setVisible}) => {
    const dispatch = useAppDispatch()
    const {message, status} = useAppSelector(state => state.account)
    const signupInfo = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bYear: new Date().getFullYear(),
        bMonth: new Date().getMonth() + 1,
        bDay: new Date().getDate(),
        gender: ''
    }
    const [signup, setSignup] = useState(signupInfo)
    const [dateError, setDateError] = useState('')
    const [genderError, setGenderError] = useState('')

    const {firstName, lastName, email, password, bYear, bMonth, bDay, gender} = signup

    const handleValueChange = e => {
        setGenderError('')
        setDateError('')
        const {name, value} = e.target
        setSignup({...signup, [name]: value})
    }

    const signupValidation = Yup.object({
        firstName: Yup.string().required("What's your First Name")
            .min(2, 'First Name must be between 2 and 16 characters')
            .max(16, 'First Name must be between 2 and 16 characters')
            .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
        lastName: Yup.string().required("What's your Last Name")
            .min(2, 'Last Name must be between 2 and 16 characters')
            .max(16, 'Last Name must be between 2 and 16 characters')
            .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
        email: Yup.string().required("What's your Email address or Phone Number")
            .email("Must be a valid email").max(30, 'Email exceeded maximum characters'),
        password: Yup.string().required('Please provide a password')
            .min(6, 'Password must be at least 6 characters long')
            .max(36, "Password can't be more than 36 characters long"),
    })

    const handleSubmit = async () => {
        dispatch(resetState())
        let currDate = new Date()
        let pickedDate = new Date(bYear, bMonth - 1, bDay)
        let atLeast14 = new Date(1970 + 14, 0, 1)
        let noMoreThan70 = new Date(1970 + 70, 0, 1)

        if ((currDate - pickedDate) < atLeast14 || (currDate - pickedDate) > noMoreThan70) {
            setDateError("It looks like you've entered the wrong info. Please make sure to use your real DoB")
        } else if (gender === '') {
            setGenderError('Please choose a gender. You can change who can see this later')
        } else {
            setGenderError('')
            setDateError('')
            try {
                await dispatch(signupUser(signup))
            } catch (e) {
                console.log("ERROR")
            }
        }
    }

    return (
        <div className="blur">
            <div className="signup">
                <div className="signup_header">
                    <i className="exit_icon" onClick={() => setVisible(false)}/>
                    <span>Sign Up</span>
                    <span>It's quick and easy</span>
                </div>
                <Formik enableReinitialize
                        initialValues={{firstName, lastName, email, password, bYear, bMonth, bDay, gender}}
                        validationSchema={signupValidation} onSubmit={handleSubmit}>
                    {() => (
                        <Form className="signup_form">
                            <div className="signup_line">
                                <SignupInput type={'text'} name={'firstName'} placeholder={'First Name'}
                                             onChange={handleValueChange}/>
                                <SignupInput type={'text'} name={'lastName'} placeholder={'Last Name'}
                                             onChange={handleValueChange}/>
                            </div>
                            <div className="signup_line">
                                <SignupInput type={'text'} name={'email'} placeholder={'Email address or Phone number'}
                                             onChange={handleValueChange}/>
                            </div>
                            <div className="signup_line">
                                <SignupInput type={'password'} name={'password'} placeholder={'Password'}
                                             onChange={handleValueChange}/>
                            </div>
                            <div className="signup_col">
                                <div className="signup_line_header">Date of Birth <i className="info_icon"/></div>
                                <DobSelect bDay={bDay} bMonth={bMonth} bYear={bYear} error={dateError}
                                           onChange={handleValueChange}
                                />
                            </div>
                            <div className="signup_col">
                                <div className="signup_line_header">Gender <i className="info_icon"/></div>
                                <GenderSelect error={genderError} onChange={handleValueChange}/>
                            </div>
                            <div className="signup_infos">
                                By clicking Sign Up, you agree to our <span>Terms, Data Policy</span> and {}
                                <span>Cookie Policy.</span> You may receive SMS notifications from us and can opt out at
                                any time
                            </div>
                            <div className="signup_btn_wrapper">
                                <button className="blue_btn open_signup" type="submit" disabled={status !== 'idle'}>
                                    Sign Up
                                </button>
                            </div>
                            <DotLoader color={'#1876f2'} loading={status !== 'idle'} size={30}/>
                            {message?.includes('success') && <div className="success_text">{message}</div>}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignupForm
