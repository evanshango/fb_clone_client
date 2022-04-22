import './styles.css'
import {ErrorMessage, useField} from "formik"
import {useMediaQuery} from "react-responsive"

const SignupInput = ({placeholder, bottom, ...props}) => {
    const [field, meta] = useField(props)

    const view1 = useMediaQuery({
        query: '(min-width: 539px)'
    })
    const view2 = useMediaQuery({
        query: '(min-width: 850px)'
    })
    const view3 = useMediaQuery({
        query: '(min-width: 1170px)'
    })

    const prop1 = view3 && field.name === 'firstName'
    const prop2 = view3 && field.name === 'lastName'

    return (
        <div className="input_wrap signup_input_wrap">
            <input className={meta.touched && meta.error ? 'input_error_border' : ''} type={field['type']}
                   name={field['name']} placeholder={placeholder} {...field} {...props}
                   style={{
                       width: `${view1 && (field.name === 'firstName' || field.name === 'lastName') ? '100%'
                           : view1 && (field.name === 'email' || field.name === 'password') ? '415px' : '300px'}`
                   }}/>
            {meta.touched && meta.error && (
                <div className={view3 ? 'input_error input_error_desktop' : 'input_error'}
                     style={{left: `${prop1 ? '-107%' : prop2 ? '107%' : ''}`}}>
                    {meta.touched && meta.error && <ErrorMessage name={field.name}/>}
                    {meta.touched && meta.error && (
                        <div className={view3 && field.name !== 'lastName' ? 'error_arrow_right'
                            : view3 && field.name === 'lastName' ? 'error_arrow_left' : !view3 && 'error_arrow_bottom'}/>
                    )}
                </div>
            )}
            {meta.touched && meta.error && <i className="error_icon"/>}
        </div>
    )
}

export default SignupInput
