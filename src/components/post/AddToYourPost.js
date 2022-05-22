import {Dots, Feeling, Photo} from "../../svg"

const AddToYourPost = ({setShowPreview}) => {
    return (
        <div className="add_to_your_post">
            <div className="add_to_text">Add to your Post</div>
            <div className="post_header_right hover2" onClick={() => setShowPreview(true)}>
                <Photo color={'#45bd62'}/>
            </div>
            <div className="post_header_right hover2"><i className="tag_icon"/></div>
            <div className="post_header_right hover2"><Feeling color={'#f7b928'}/></div>
            <div className="post_header_right hover2"><i className="maps_icon"/></div>
            <div className="post_header_right hover2"><i className="microphone_icon"/></div>
            <div className="post_header_right hover2"><Dots color={'#65676b'}/></div>
        </div>
    )
}

export default AddToYourPost
