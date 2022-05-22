import './styles.css'
import {Feeling, LiveVideo, Photo} from "../../../svg"

const CreatePost = ({user, setCreatePostVisible}) => {
    return (
        <div className="create_post">
            <div className="create_post_header" onClick={() => setCreatePostVisible(true)}>
                <img src={user?.picture} alt={user?.firstName}/>
                <div className="open_post hover2">What's on your mind, {user?.firstName}</div>
            </div>
            <div className="create_splitter"/>
            <div className="create_post_body">
                <div className="create_post_icon hover2">
                    <LiveVideo color={'#f3425f'}/> Live Video
                </div>
                <div className="create_post_icon hover2">
                    <Photo color={'#4bbf67'}/> Photo/Video
                </div>
                <div className="create_post_icon hover2">
                    <Feeling color={'#f7b928'}/> Feeling/Activity
                </div>
            </div>
        </div>
    )
}

export default CreatePost
