import Header from "../../components/header"
import LeftHome from "../../components/home/left"
import {useAppDispatch, useAppSelector} from "../../store/store"
import RightHome from "../../components/home/right"
import Stories from "../../components/home/stories"
import './styles.css'
import CreatePost from "../../components/home/createPost"
import {useParams} from "react-router-dom"
import ActivateForm from "./ActivateForm"
import {useEffect} from "react"
import {activateAccount} from "../account/accountSlice"
import Verification from "../../components/home/verification"

const Home = () => {
    const {token} = useParams()
    const dispatch = useAppDispatch()
    const {user, status, message} = useAppSelector(state => state.account)

    useEffect(() => {
        token && token !== '' && dispatch(activateAccount({token}))
    }, [dispatch, token])

    return (
        <div className='home'>
            {token && token !== '' && (
                <ActivateForm
                    type={message?.includes('successfully') ? 'success' : 'failed'}
                    header={`Account Verification ${message?.includes('successfully') ? 'Succeeded' : 'Failed'}`}
                    text={message} status={status}
                />
            )}
            <Header user={user}/>
            <LeftHome user={user}/>
            <div className="home_middle">
                <Stories/>
                {!user?.verified && <Verification/>}
                <CreatePost user={user}/>
            </div>
            <RightHome user={user}/>
        </div>
    )
}

export default Home
