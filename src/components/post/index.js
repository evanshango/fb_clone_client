import './styles.css'
import {useRef, useState} from "react"
import EmojiPickerBackground from "./EmojiPickerBackground"
import AddToYourPost from "./AddToYourPost"
import ImagePreview from "./ImagePreview"
import {useClickOutside} from "../../helpers/clickOutside"

const PostPopup = ({user, setCreatePostVisible}) => {
    const dialog = useRef(null)
    const [text, setText] = useState('')
    const [images, setImages] = useState([])
    const [showPreview, setShowPreview] = useState(false)
    const [bg, setBg] = useState('')

    const handleClose = () => setCreatePostVisible(false)

    useClickOutside(dialog, () => setCreatePostVisible(false))

    return (
        <div className="blur">
            <div className="post_box" ref={dialog}>
                <div className="box_header">
                    <div className="small_circle" onClick={handleClose}>
                        <i className="exit_icon"/>
                    </div>
                    <span>Create Post</span>
                </div>
                <div className="box_profile">
                    <img src={user?.picture} alt={user?.username} className="box_profile_img"/>
                    <div className="box_col">
                        <div className="box_profile_name">{user?.firstName} {user?.lastName}</div>
                        <div className="box_privacy">
                            <img src={'../../../icons/public.png'} alt="privacy"/>
                            <span>Public</span>
                            <i className="arrowDown_icon"/>
                        </div>
                    </div>
                </div>
                {!showPreview ? (
                    <EmojiPickerBackground user={user} text={text} setText={setText} bg={bg} setBg={setBg}/>
                ) : (
                    <ImagePreview user={user} text={text} setText={setText} showPreview={showPreview} images={images}
                                  setImages={setImages} setShowPreview={setShowPreview}/>
                )}
                <AddToYourPost setShowPreview={setShowPreview}/>
                <button className="post_submit">Post</button>
            </div>
        </div>
    )
}

export default PostPopup
