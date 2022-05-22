import {useEffect, useRef, useState} from "react"
import EmojiPicker from "emoji-picker-react"
import {postBackgrounds} from "../../data/postBackgrounds"

const EmojiPickerBackground = ({user, text, setText, showPreview, bg, setBg}) => {
    const textRef = useRef(null)
    const bgRef = useRef(null)
    const [cursorPos, setCursorPos] = useState()
    const [picker, setPicker] = useState(false)
    const [showBgs, setShowBgs] = useState(false)

    useEffect(() => {
        textRef.current.selectionEnd = cursorPos
    }, [cursorPos, textRef])

    const handleEmojiClick = (e, {emoji}) => {
        const ref = textRef.current
        ref.focus()
        const start = text.substring(0, ref.selectionStart)
        const end = text.substring(ref.selectionStart)
        const newText = `${start}${emoji}${end}`
        setText(newText)
        setCursorPos(start.length + emoji.length)
    }

    const backgroundHandler = (index, isRemove) => {
        bgRef.current.style.backgroundImage = !isRemove ? `url(${postBackgrounds[index]})` : ''
        setBg(!isRemove ? postBackgrounds[index] : '')
        !isRemove ? bgRef.current.classList.add('bg_handler') : bgRef.current.classList.remove('bg_handler')
    }

    return (
        <div className={showPreview ? 'images_input' : ''}>
            <div className={`${!showPreview ? 'flex_center' : ''}`} ref={bgRef}>
                <textarea className={`post_input ${showPreview ? 'input2' : ''}`} maxLength="250" value={text}
                          ref={textRef} placeholder={`What's on your mind, ${user?.firstName}`}
                          onChange={e => setText(e.target.value)} onClick={() => setPicker(false)}
                          style={{paddingTop: `${bg ? Math.abs(textRef.current.value.length * 0.1 - 30) : '0'}%`}}>
                </textarea>
            </div>
            <div className={`${!showPreview ? 'post_emojis_wrap' : ''}`}>
                {picker && (
                    <div className={`comment_emoji_picker ${showPreview ? 'move_picker2' : 'rl_move'}`}>
                        <EmojiPicker onEmojiClick={handleEmojiClick}/>
                    </div>
                )}
                {!showPreview && (
                    <img src={'../../../icons/colorful.png'} alt="color" onClick={() => setShowBgs(!showBgs)}/>
                )}
                {!showPreview && showBgs && (
                    <div className="post_backgrounds">
                        <div className="no_bg" onClick={() => backgroundHandler(null, true)}/>
                        {postBackgrounds.map((bg, i) => (
                            <img src={bg} key={i} alt={`bg${i}`} onClick={() => backgroundHandler(i, false)}/>
                        ))}
                    </div>
                )}
                <div>
                    <i className={`emoji_icon_large ${showPreview ? 'move_left' : ''}`}
                       onClick={() => setPicker(!picker)}/>
                </div>
            </div>
        </div>
    )
}

export default EmojiPickerBackground
