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
    <div className='shadow h-14 flex justify-around  bg-white'>
      <div className='flex flex-col text-xl justify-center h-full ml-4'>
        PayTM App
      </div>
      <div className='flex'>
        <div className='flex flex-col justify-center h-full mr-4'>
          Hello
        </div>
        <div className='rounded-full w-12 h-12 bg-slate-200 flex justify-center mt-1 mr-2 '>
          <div className='flex flex-col justify-center h-full text-xl'>
            {firstName}
          </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Appbar