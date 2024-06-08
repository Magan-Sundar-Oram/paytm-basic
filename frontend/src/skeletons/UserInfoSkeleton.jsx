import React from 'react'

const UserInfoSkeleton = () => {
    return (
        <div className="animate-pulse flex items-center gap-2 mb-2">
            <div className="animate-pulse h-8 w-8 bg-gray-300 rounded-full"></div>
            <div className="animate-pulse h-8  bg-gray-300 rounded w-28"></div>
        </div>
    )
}

export default UserInfoSkeleton