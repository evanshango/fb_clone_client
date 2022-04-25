import './styles.css'
import {ArrowRight, Plus} from "../../../svg"
import {stories} from "../../../data/home"
import Story from "./Story"
import {useMediaQuery} from "react-responsive"

const Stories = () => {
    const query1175 = useMediaQuery({query: '(max-width: 1175px)'})
    const query1030 = useMediaQuery({query: '(max-width: 1030px)'})
    const query960 = useMediaQuery({query: '(max-width: 960px)'})
    const query885 = useMediaQuery({query: '(max-width: 885px)'})
    const query360 = useMediaQuery({query: '(max-width: 360px)'})

    const max = query360 ? 4 : query885 ? 5 : query960 ? 4 : query1030 ? 5 : query1175 ? 4 : stories.length
    return (
        <div className="stories">
            <div className="create_story_card">
                <img src={'../../../images/default_pic.png'} alt="default" className="create_story_image"/>
                <div className="plus_story"><Plus color={'#fff'}/></div>
                <div className="story_create_text">Create Story</div>
            </div>
            {stories.slice(0, max).map((story, i) => <Story key={i} story={story}/>)}
            <div className="white_circle">
                <ArrowRight color={'#65676b'}/>
            </div>
        </div>
    )
}

export default Stories
