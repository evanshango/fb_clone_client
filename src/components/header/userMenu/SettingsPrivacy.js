import React from 'react'

const SettingsPrivacy = ({setVisible}) => {
    return (
        <div className='absolute_wrap'>
            <div className="absolute_wrap_header">
                <div className="circle hover3" onClick={() => setVisible(0)}><i className="arrow_back_icon"/></div>
                Settings & Privacy
            </div>
            <div className="menu_item hover3">
                <div className="small_circle"><i className="settings_filled_icon"/></div>
                <span>Settings</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle"><i className="privacy_checkup_icon"/></div>
                <span>Privacy Checkup</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle"><i className="privacy_shortcuts_icon"/></div>
                <span>Privacy Shortcuts</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle"><i className="activity_log_icon"/></div>
                <span>Activity Log</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle"><i className="news_icon"/></div>
                <span>News Feed Preferences</span>
            </div>
            <div className="menu_item hover3">
                <div className="small_circle"><i className="language_icon"/></div>
                <span>Language</span>
            </div>
        </div>
    )
}

export default SettingsPrivacy
