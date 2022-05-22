import React, {useRef} from 'react'
import EmojiPickerBackground from "./EmojiPickerBackground"

const ImagePreview = ({user, text, setText, showPreview, images, setImages, setShowPreview}) => {
    const imageRef = useRef(null)

    const handleFileChange = e => {
        let files = Array.from(e.target.files)
        files.forEach((file) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                setImages((images) => [...images, event.target.result])
            }
        })
    }
    return (
        <div className="overflow_a scrollbar">
            <EmojiPickerBackground user={user} text={text} setText={setText} showPreview={showPreview}/>
            <div className="add_pics_wrap">
                <input type="file" multiple hidden ref={imageRef} onChange={handleFileChange}/>
                {images && images.length ? (
                    <div className="add_pics_inside1 p0">
                        <div className="preview_actions">
                            <button className="hover2"><i className="edit_icon"/>Edit</button>
                            <button className="hover2" onClick={() => imageRef.current.click()}>
                                <i className="addPhoto_icon"/>Add Photos/Videos
                            </button>
                        </div>
                        <div className="small_white_circle" onClick={() => setImages([])}>
                            <i className="exit_icon"/>
                        </div>
                        <div className={images.length === 1 ? 'preview1' : images.length === 2 ? 'preview2'
                            : images.length === 3 ? 'preview3' : images.length === 4 ? 'preview4' : images.length === 5
                                ? 'preview5' : images.length % 2 === 0 ? 'preview6' : 'preview6 singular_grid'}>
                            {images.map((pic, i) => (
                                <img src={pic} alt={`pic-${i}`} key={i}/>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="add_pics_inside1">
                        <div className="small_white_circle" onClick={() => setShowPreview(false)}>
                            <i className="exit_icon"/>
                        </div>
                        <div className="add_col" onClick={() => imageRef.current.click()}>
                            <div className="add_circle"><i className="addPhoto_icon"/></div>
                            <span>Add Photos/Videos</span>
                            <span>or drag and drop</span>
                        </div>
                    </div>
                )}
                <div className="add_pics_inside2">
                    <div className="add_circle"><i className="phone_icon"/></div>
                    <div className="mobile_text">Add Photos from your Mobile device.</div>
                    <span className="add_phone_btn">Add</span>
                </div>
            </div>
        </div>
    )
}

export default ImagePreview
