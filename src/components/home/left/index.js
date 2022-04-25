import './styles.css'
import LeftLink from "./LeftLink"
import {left} from '../../../data/home'
import {Link} from "react-router-dom"
import {ArrowDown1} from "../../../svg"
import {useState} from "react"
import Shortcut from "./Shortcut"

const LeftHome = ({user}) => {
    const [visible, setVisible] = useState(false)
    return (
        <div className="left_home scrollbar">
            <Link to={'/profile'} className="left_link hover2">
                <img src={user?.picture} alt="profile"/>
                <span style={{textTransform: 'capitalize'}}>{user?.firstName} {user?.lastName}</span>
            </Link>
            {left.slice(0, 8).map((link, i) => (
                <LeftLink key={i} img={link.img} text={link.text} notification={link.notification}/>)
            )}
            {!visible && (
                <div className="left_link hover2" onClick={() => setVisible(true)}>
                    <div className="small_circle"><ArrowDown1/></div>
                    <span>See More</span>
                </div>
            )}
            {visible && (
                <div className="more_left">
                    {left.slice(8, left.length).map((link, i) => (
                        <LeftLink key={i} img={link.img} text={link.text} notification={link.notification}/>)
                    )}
                    <div className="left_link hover2" onClick={() => setVisible(false)}>
                        <div className="small_circle rotate_360"><ArrowDown1/></div>
                        <span>Show Less</span>
                    </div>
                </div>
            )}
            <div className="splitter"/>
            <div className="shortcut">
                <div className="heading">Your Shortcuts</div>
                <div className="edit_shortcut">Edit</div>
            </div>
            <div className="shortcut_list">
                <Shortcut link={'/'} image={'../../images/ytb.png'} name={'My Youtube Channel'}/>
                <Shortcut link={'/'} image={'../../images/insta.png'} name={'My Instagram Account'}/>
            </div>
            <div className={`fb_copyright ${visible && 'relative_fb_copyright'}`}>
                <Link to={'/'}>Privacy </Link> <span>. </span>
                <Link to={'/'}>Terms </Link> <span>. </span>
                <Link to={'/'}>Advertising </Link> <span>. </span>
                <Link to={'/'}>Ad Choices <i className="ad_choices_icon"/></Link> <span>. </span>
                <Link to={'/'}>Cookies </Link> <span>. </span>
                <Link to={'/'}>More </Link> <span>. </span> <br/>
                Meta © {new Date().getFullYear()}
            </div>
        </div>
    )
}

export default LeftHome
