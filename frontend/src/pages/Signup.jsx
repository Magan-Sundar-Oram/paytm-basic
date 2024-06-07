import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleValidation = () => {
        if (!username.trim()) {
            toast.error('Please enter your full name.');
            return false;
        }
        if (!email.trim()) {
            toast.error('Please enter your email.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }
        if (!password.trim()) {
            toast.error('Please enter a password.');
            return false;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return false;
        }
        return true;
    };

    async function handleClick(e) {
        e.preventDefault();
        if (handleValidation()) {
            try {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username, email, password
                })
                if (response.status === 201) {
                    toast.success(response.data.message, {
                        onClose: () => { navigate('/signin') },
                        autoClose: 2000,
                    });
                }
            } catch (error) {
                toast.error('An error occurred during signup. Please try again.');
            }
        }

    }

    return (
        <div className='bg-slate-900 h-screen flex justify-center w-screen items-center'>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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
            <div className='flex justify-normal flex-col'>
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox onChange={(e) => { setUsername(e.target.value) }}
                        placeholder={"John"} label={"Full Name"} />

                    <InputBox onChange={(e) => { setEmail(e.target.value) }}
                        placeholder={"example123@gmail.com"} label={"Email"} />

                    <InputBox onChange={(e) => { setPassword(e.target.value) }}
                        placeholder={"123#$qqwe"} label={"Password"} type='password' />
                    <InputBox
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={'Confirm Password'}
                        label={'Confirm Password'}
                    />
                    <div className='pt-4'>
                        <Button onClick={handleClick} label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}

export default Signup