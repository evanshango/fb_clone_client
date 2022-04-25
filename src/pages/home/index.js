import Header from "../../components/header"
import LeftHome from "../../components/home/left"
import {useAppSelector} from "../../store/store"
import RightHome from "../../components/home/right"
import Stories from "../../components/home/stories"
import './styles.css'
import CreatePost from "../../components/home/createPost"

const Home = () => {
    const {user} = useAppSelector(state => state.account)
    return (
        <div className='home'>
            <Header user={user}/>
            <LeftHome user={user}/>
            <div className="home_middle">
                <Stories/>
                <CreatePost user={user}/>
            </div>
            <RightHome user={user}/>
        </div>
    )
}

export default Home
