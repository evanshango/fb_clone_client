import React, {useRef, useState} from 'react'
import './styles.css'
import {Link} from "react-router-dom"
import {
    ArrowDown,
    Friends,
    Gaming,
    HomeActive,
    Logo,
    Market,
    Menu,
    Messenger,
    Notifications,
    Search,
    Watch
} from "../../svg"
import SearchMenu from "./SearchMenu"
import AllMenu from "./AllMenu"
import {useClickOutside} from "../../helpers/clickOutside"
import UserMenu from "./userMenu"

const Header = ({user}) => {
    const color = '#65676b'

    const [showSearchMenu, setShowSearchMenu] = useState(false)
    const [showAllMenu, setShowAllMenu] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const allMenu = useRef(null)
    const userMenu = useRef(null)

    useClickOutside(allMenu, () => setShowAllMenu(false))

    useClickOutside(userMenu, () => setShowUserMenu(false))

    return (
        <header>
            <div className="header_left">
                <Link to={'/'} className="header_logo">
                    <div className="circle">
                        <Logo/>
                    </div>
                </Link>
                <div className="search search1" onClick={() => setShowSearchMenu(true)}>
                    <Search color={color}/>
                    <input className="hide_input" type="text" placeholder={'Search Facebook'}/>
                </div>
            </div>
            {showSearchMenu && <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu}/>}
            <div className="header_middle">
                <Link to={'/'} className="middle_icon active">
                    <HomeActive/>
                </Link>
                <Link to={'/'} className="middle_icon hover1">
                    <Friends color={color}/>
                </Link>
                <Link to={'/'} className="middle_icon hover1">
                    <Watch color={color}/>
                    <div className="middle_notification">9+</div>
                </Link>
                <Link to={'/'} className="middle_icon hover1">
                    <Market color={color}/>
                </Link>
                <Link to={'/'} className="middle_icon hover1">
                    <Gaming color={color}/>
                </Link>
            </div>
            <div className="header_right">
                {user?.picture && (
                    <Link to={'/profile'} className="profile_link hover1">
                        <img src={user?.picture} alt="profile"/>
                        <span style={{textTransform: 'capitalize'}}>{user?.firstName}</span>
                    </Link>
                )}
                <div className={`circle_icon hover1 ${showAllMenu && 'active_header'}`} ref={allMenu}>
                    <div onClick={() => setShowAllMenu(!showAllMenu)}>
                        <div style={{transform: 'translateY(2px)'}}>
                            <Menu/>
                        </div>
                    </div>
                    {showAllMenu && <AllMenu/>}
                </div>
                <div className="circle_icon hover1">
                    <Messenger/>
                </div>
                <div className="circle_icon hover1">
                    <Notifications/>
                    <div className="right_notification">5</div>
                </div>
                {user && (
                    <div className={`circle_icon hover1 ${showUserMenu && 'active_header'}`} ref={userMenu}>
                        <div onClick={() => setShowUserMenu(!showUserMenu)}>
                            <div style={{transform: 'translateY(2px)'}}>
                                <ArrowDown/>
                            </div>
                        </div>
                        {showUserMenu && <UserMenu user={user}/>}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
