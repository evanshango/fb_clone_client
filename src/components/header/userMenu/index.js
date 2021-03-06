import React, {useState} from 'react'
import {Link} from "react-router-dom"
import SettingsPrivacy from "./SettingsPrivacy"
import HelpSupport from "./HelpSupport"
import DisplayAccessibility from "./DisplayAccessibility"
import {useAppDispatch} from "../../../store/store"
import {signout} from "../../../pages/account/accountSlice"

const UserMenu = ({user}) => {
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(0)
    return (
        <div className="menu">
            {visible === 0 && (
                <>
                    <Link to={'/'} className="menu_header hover3">
                        <img src={user?.picture} alt="profile"/>
                        <div className="menu_col">
                                    <span
                                        style={{textTransform: 'capitalize'}}>{user?.firstName} {user?.lastName}</span>
                            <span>See your Profile</span>
                        </div>
                    </Link>
                    <div className="menu_splitter"/>
                    <div className="menu_main hover3">
                        <div className="small_circle"><i className="report_filled_icon"/></div>
                        <div className="menu_col">
                            <div className="menu_span1">Give feedback</div>
                            <div className="menu_span2">Help us improve Facebook-Clone</div>
                        </div>
                    </div>
                    <div className="menu_splitter"/>
                    <div className="menu_item hover3" onClick={() => setVisible(1)}>
                        <div className="small_circle"><i className="settings_filled_icon"/></div>
                        <span>Settings & Privacy</span>
                        <div className="right_arrow"><i className="right_icon"/></div>
                    </div>
                    <div className="menu_item hover3" onClick={() => setVisible(2)}>
                        <div className="small_circle"><i className="help_filled_icon"/></div>
                        <span>Help & Support</span>
                        <div className="right_arrow"><i className="right_icon"/></div>
                    </div>
                    <div className="menu_item hover3" onClick={() => setVisible(3)}>
                        <div className="small_circle"><i className="dark_filled_icon"/></div>
                        <span>Display & Accessibility</span>
                        <div className="right_arrow"><i className="right_icon"/></div>
                    </div>
                    <div className="menu_item hover3" onClick={() => dispatch(signout())}>
                        <div className="small_circle"><i className="logout_filled_icon"/></div>
                        <span>Sign Out</span>
                    </div>
                </>
            )}
            {visible === 1 && <SettingsPrivacy setVisible={setVisible}/>}
            {visible === 2 && <HelpSupport setVisible={setVisible}/>}
            {visible === 3 && <DisplayAccessibility setVisible={setVisible}/>}
        </div>
    )
}

export default UserMenu
