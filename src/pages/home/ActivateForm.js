import {PropagateLoader} from "react-spinners"
import {useAppDispatch} from "../../store/store"
import {useNavigate} from "react-router-dom"
import {fetchUser} from "../account/accountSlice"

const ActivateForm = ({type, header, text, status}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
        dispatch(fetchUser())
        navigate('/')
    }
    return (
        <div className="blur">
            <div className="popup">
                <div className={`popup_header ${type === 'success' ? 'success_text' : 'error_text'}`}>{header}</div>
                <div className="popup_message">{text}</div>
                {text && (
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <PropagateLoader color={'#1876f2'} size={20} loading={status === 'activatePending'}/>
                        <button className="blue_btn" style={{width: '5rem', marginTop: '2.1rem'}}
                                onClick={handleClick} disabled={status === 'activatePending'}>
                            OK
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActivateForm
