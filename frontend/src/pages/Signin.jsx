import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import {baseUrl} from '../url'

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleValidation = () => {
    if (!email.trim()) {
      toast.error('Please enter yout email.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    if (!password.trim()) {
      toast.error('Please enter a password');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return false;
    }
    return true;
  }

  // async function handleClick(e) {
  //   e.preventDefault();
  //   if (handleValidation()) {
  //     console.log('Validation passed');
  //     try {
  //       const response = await axios.post(`${baseUrl}/api/v1/user/signin`, {
  //         email, password
  //       })
  //       console.log('Response received:', response);

  //       if (response.status === 200) {
  //         toast.success(response.data.message, {
  //           onClose: () => { navigate('/dashboard') },
  //           autoClose: 3000,
  //         });

  //         localStorage.setItem("token", response.data.token)
  //         login(response.data.token);
  //       }

  //       if (response.status === 401) {
  //         toast.error(response.data.message);
  //       }
  //     } catch (error) {
  //       toast.error('An error occurred during the sign in. Please try again.');
  //     }
  //   }
  // }
  const handleClick = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const response = await fetch(`${baseUrl}/api/v1/user/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            toast.error(data.message);
          } else {
            throw new Error('Network response was not ok');
          }
        } else {
          if (response.status === 200) {
            toast.success('Static test message'); // Simplified toast for testing
            toast.success(data.message || 'Sign-in successful!', {
              onClose: () =>  navigate('/dashboard') });
            localStorage.setItem("token", data.token);
            login(data.token);
          }
        }
      } catch (error) {
        toast.error('An error occurred during the sign in. Please try again.');
      }
    } else {
      toast.error('Validation failed')
    }
  };



  return (
    <div className='bg-slate-900 h-screen flex justify-center items-center'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox onChange={(e) => { setEmail(e.target.value) }}
            placeholder={"example123@gmail.com"} label={"Email"} />

          <InputBox onChange={(e) => { setPassword(e.target.value) }}
            placeholder={"******"} label={"Password"} />

          <div className='pt-4'>
            <Button onClick={handleClick} label={"Sign in"} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>

      </div>

    </div>
  )
}

export default Signin
