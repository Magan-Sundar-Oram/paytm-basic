import React from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import { useState, useEffect } from 'react'
import axios from 'axios'
import UserInfo from '../components/UserInfo'
import UserInfoSkeleton from '../skeletons/UserInfoSkeleton'
import BalanceSkeleton from '../skeletons/BalanceSkeleton'
import { baseUrl } from '../url'

const Dashboard = () => {
  const [balance, setBalance] = useState(0)
  const [inuser, setInuser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem('token')
    //       }
    //     });
    //     setBalance((response.data.balance).toFixed(2))
    //   } catch (error) {
    //     console.log("Error while fetching data" + error)
    //   }
    // }
    // fetchData()

    // const fetchUser = async () => {
    //   const response = await axios.get("http://localhost:3000/api/v1/user/inuser", {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token")
    //     }
    //   })
    //   setInuser(response.data.userData);
    //   setIsLoading(false);

    // }
    // fetchUser()

    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/account/balance`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        });
        setBalance((response.data.balance).toFixed(2));
        
        const userResponse = await axios.get(`${baseUrl}/api/v1/user/inuser`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        setInuser(userResponse.data.userData);
        setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching data: " + error);
        setIsLoading(false);
      }
    };
    fetchData();

  }, [balance])

  return (
    <div>

      <Appbar username={inuser.username} />
      <div className=' mt-8 flex w-screen h-screen justify-center'>
        <div className='md:w-3/5 lg:w-2/5 w-11/12 bg-white p-5 rounded-md'>
          <div className='shadow-md py-5 px-3 rounded-md'>
          {isLoading ? <UserInfoSkeleton /> : <UserInfo username={inuser.username} />}
          {isLoading ? <BalanceSkeleton /> : <Balance value={balance} />}
          </div>
          <Users />
        </div>
      </div>
    </div>
  )
}

export default Dashboard