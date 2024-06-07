import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {baseUrl} from '../url'

const SendMoney = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');
  const name = searchParams.get('username')

  const [amount, setAmount] = useState(0)
  const [error, setError] = useState('')
  


  async function handleClick() {
    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {

      const response = await axios.post(`${baseUrl}/api/v1/account/transfer`, {
        to: id,
        amount: Number(amount)
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      toast.success(response.data.message, {
        onClose: () => { navigate('/dashboard')},
        autoClose: 4000,
      });
    } catch (error) {
      toast.error('An error occurred during the transfer. Please try again.', {
        onClose: () => navigate('/dashboard')
      });
    }
  }


  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && /^\d*\.?\d*$/.test(value))) {
      setAmount(value);
      setError('');
    } else {
      setError('Please enter valid amount');
    }
  };

  return (

    <div className="flex justify-center h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <div className="h-full flex flex-col justify-center">
        <div
          className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  onChange={handleChange}
                  type="number"
                  min="0"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />{error && <div className="text-red-500 mt-2">{error}</div>}
              </div>
              <button onClick={handleClick} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendMoney
