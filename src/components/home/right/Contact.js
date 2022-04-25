import React from 'react'

const Contact = ({user}) => {
    return (
        <div className='contact hover3'>
            <div className="contact_image"><img src={user?.picture} alt={user?.firstName}/></div>
            <span style={{textTransform: 'capitalize'}}>{user?.firstName} {user?.lastName}</span>
        </div>
    )
}

export default Contact
