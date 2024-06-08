import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full w-full h-full animate-spin"></div>
        <div className="absolute border-4 border-transparent border-b-blue-500 border-l-blue-500 rounded-full w-full h-full animate-spin delay-200"></div>
      </div>
    </div>
  )
}

export default Loader