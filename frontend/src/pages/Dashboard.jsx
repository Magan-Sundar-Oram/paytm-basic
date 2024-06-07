import React from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [balance, setBalance] = useState(0)
  const [inuser, setInuser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        });
        setBalance((response.data.balance).toFixed(2))
      } catch (error) {
        console.log("Error while fetching data" + error)
      }
    }
    fetchData()

    const fetchUser = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/user/inuser", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      setInuser(response.data.userData);

    }
    fetchUser()
  }, [balance])

  return (
    <div>
      <Appbar username={inuser.username}/>
      <div className=' mt-8 flex w-screen h-screen justify-center'>
        <div className='w-2/5 bg-white p-5 rounded-md'>
          <Balance value={balance} />
          <Users />
        </div>
      </div>
    </div>
  )
}

export default Dashboard