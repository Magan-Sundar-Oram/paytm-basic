import React from 'react'

const Button = ({ label, onClick }) => {
    return (
        <button onClick={onClick} type='button' className='w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 md:font-medium rounded-lg text-md px-2 py-2 me-2 mb-2'>
            {label}
        </button>
    )
}

export default Button