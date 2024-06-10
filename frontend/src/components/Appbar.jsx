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
         <button onClick={()=>{navigate('/dashboard')}}>PayTM App</button>
      </div>
      <div className='flex items-center gap-2'>
        {/* <div className='flex text-2xl flex-col justify-center h-full mr-4'>
          Hello
        </div> */}

        {/* <div className='rounded-md py-2 px-4 capitalize hover:bg-slate-400 bg-slate-200 flex justify-center mr-2 animate-border-move'>
          <button onClick={() => {
            navigate('/profile')
          }} className='flex flex-col capitalize justify-center h-full font-bold'>
            {firstName}
          </button>
        </div> */}
        <div className='rounded-md py-2 px-5 capitalize hover:bg-slate-400 bg-slate-200 flex justify-center mr-2  relative overflow-hidden'>
          <div className='absolute inset-0 border border-transparent rounded-md animate-border-move'></div>
          <div className='absolute inset-0 rounded-md' style={{ boxShadow: 'inset 1px 1px 1px 1px blue' }}></div>
          <button onClick={() => {
            navigate('/profile')
          }} className='flex flex-col tracking-wider capitalize justify-center  h-full font-bold z-10'>
            {firstName}
          </button>
        </div>












        <button className='bg-slate-800 hover:bg-gray-900 py-2 px-4  rounded-md text-white' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Appbar
