import React from 'react'

const UserSkeleton = () => {
  return (
    <div className="shadow-md items-center mb-2 rounded-md md:flex-row flex justify-between p-2 animate-pulse">
            <div className="flex items-center">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2"></div>
                <div className="flex flex-col justify-center h-full">
                    <div className="h-6 bg-slate-200 rounded w-24 mb-2"></div>
                    <div className="h-6 bg-slate-200 rounded w-36"></div>
                </div>
            </div>
            <div className="flex items-center flex-col justify-center h-full">
                <div className="h-10 bg-slate-200 rounded w-24"></div>
            </div>
        </div>
  )
}

export default UserSkeleton