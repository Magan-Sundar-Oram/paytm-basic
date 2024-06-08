import React from 'react'

const BalanceSkeleton = () => {
    return (
        <div className="animate-pulse flex">
            <div className="h-6 animate-pulse bg-gray-300 rounded w-24"></div>
            <div className="h-6 animate-pulse bg-gray-300 rounded w-24 ml-4"></div>
        </div>
    )
}

export default BalanceSkeleton