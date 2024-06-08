import React from 'react'

const UserInfo = ({ username }) => {
    return (
        <div className='flex items-center gap-2 mb-2'>
            <div className='text-2xl'>Hello : )</div>
            <div className='text-3xl capitalize text-slate-700'>{username}</div>
        </div>
    )
}

export default UserInfo
