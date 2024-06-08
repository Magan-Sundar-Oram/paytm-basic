import React from 'react'
// import Logout from './Logout'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Appbar = ({ username }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/signin')
  }

  if (username) {
    var firstName = username.split(" ")[0]
  }
  return (
    <div className='shadow h-20 items-center flex justify-around  bg-white'>
      <div className='flex flex-col text-xl justify-center h-full ml-4'>
        PayTM App
      </div>
      <div className='flex items-center gap-2'>
        {/* <div className='flex text-2xl flex-col justify-center h-full mr-4'>
          Hello
        </div> */}
        <div className='rounded-md py-2 px-4 capitalize  bg-slate-200 flex justify-center mr-2 '>
          <div className='flex flex-col justify-center h-full font-bold'>
            {firstName}
          </div>
        </div>
        <button className='bg-slate-800 hover:bg-gray-900 py-2 px-4  rounded-md text-white' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Appbar
