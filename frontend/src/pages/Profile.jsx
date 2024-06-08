import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../url';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appbar from '../components/Appbar';
import UpdateProfileSection from '../components/UpdateProfileSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [balance, setBalance] = useState(null);
    const [showUpdateSection, setShowUpdateSection] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/v1/user/inuser`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const userData = response.data.userData;
            setUsername(userData.username);
            setEmail(userData.email);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchBalance = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/v1/account/balance`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching user balance:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchBalance();
    }, []);

    const refreshBalance = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/v1/account/balance`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBalance(response.data.balance);
            toast.success('Balance refreshed successfully.', { autoClose: 1000 });
        } catch (error) {
            toast.error('Error refreshing balance. Please try again.');
        }
    };

    const deleteUserAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            try {
                const response = await axios.delete(`${baseUrl}/api/v1/user/delete-user`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.data.status === 200) {
                    toast.success(response.data.message, {
                        onClose: () => { navigate('/') },
                        autoClose: 2000,
                    })
                }

            } catch (error) {
                console.error('Error deleting user account:', error);
                toast.error(response.data.message, {
                    onClose: () => { navigate('/dashboard') },
                    autoClose: 2000,
                })
            }
        }
    };

    return (
        <>
            <Appbar username={username} />
            <div className="flex justify-center">
                <ToastContainer />
                <div className="w-[90%] sm:w-[80%] md:w-[500px] mt-10  shadow-lg rounded-lg overflow-hidden">
                    <div className="pb-6  bg-gray-100">
                        <h1 className="text-4xl md:font-semibold p-2 uppercase shadow-xl bg-slate-200 ">Profile</h1>

                        <div className="bg-gray-100 pt-5 flex p-2 flex-col gap-2 text-xl pb-10">
                            <div className="flex gap-3">
                                <p className="font-semibold">Username:</p>
                                <p className='capitalize'>{username}</p>
                            </div>
                            <div className="flex gap-3 ">
                                <p className="font-semibold">Email:</p>
                                <p>{email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="font-semibold">Balance:</p>
                                <p>{balance !== null ? `₹ ${balance.toFixed(2)}` : 'Loading...'}</p>
                                <button
                                    onClick={refreshBalance}
                                    className="hover:bg-gray-600 bg-gray-400 w-8 h-8 rounded-full text-white">
                                    <FontAwesomeIcon icon={faSyncAlt} />
                                </button>
                            </div>
                        </div>
                        {!showUpdateSection && (
                            <div className="flex items-center gap-3 px-5">
                                <Button label="Update Profile" onClick={() => setShowUpdateSection(true)} />
                                <button
                                    onClick={deleteUserAccount}
                                    className="hover:bg-red-600 shadow-red-800 shadow-md bg-red-400 flex gap-2 items-center justify-center w-full text-white focus:outline-none focus:ring-4 focus:ring-gray-300 md:font-medium rounded-lg text-md px-2 py-2 me-2 mb-2">
                                    <FontAwesomeIcon icon={faTrash} /> <span>Delete</span>
                                </button>
                            </div>
                        )}
                        <div className={` transition-all duration-500 ${showUpdateSection ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                            {showUpdateSection && (
                                <UpdateProfileSection
                                    handleCancelUpdate={() => setShowUpdateSection(false)}
                                    fetchUserData={fetchUserData} // Pass the refetch function here
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
