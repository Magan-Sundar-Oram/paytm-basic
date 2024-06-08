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
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [balance, setBalance] = useState(null);
    const [showUpdateSection, setShowUpdateSection] = useState(false);
    const [originalUsername, setOriginalUsername] = useState('');
    const [originalEmail, setOriginalEmail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/user/inuser`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const userData = response.data.userData;
                setUsername(userData.username);
                setOriginalUsername(userData.username);
                setEmail(userData.email);
                setOriginalEmail(userData.email);
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

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put(`${baseUrl}/api/v1/user/update`, {
                username,
                email,
                password,
                newPassword,
                confirmNewPassword
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            toast.success(response.data.message);
            setShowUpdateSection(false); // Hide update section after successful update
        } catch (error) {
            toast.error('Error updating profile. Please try again.');
        }
    };

    const handleCancelUpdate = () => {
        setUsername(originalUsername);
        setEmail(originalEmail);
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowUpdateSection(false);
    };

    return (
        <>
            <Appbar username={username} />
            <div className="flex justify-center">
                <ToastContainer />
                <div className="w-[90%] sm:w-[80%] md:w-[500px] mt-10 shadow-lg rounded-lg overflow-hidden">
                    <div className=" ">
                        <h1 className="text-4xl md:font-semibold p-2 uppercase shadow-xl bg-slate-200 ">Profile</h1>

                        <div className="bg-gray-100 flex p-2 flex-col gap-2 text-xl">
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
                        <div className={` transition-all duration-500 ${showUpdateSection ? 'opacity-100 max-h-full' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                            {showUpdateSection && (
                                <UpdateProfileSection
                                    username={username}
                                    setUsername={setUsername}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                    newPassword={newPassword}
                                    setNewPassword={setNewPassword}
                                    confirmNewPassword={confirmNewPassword}
                                    setConfirmNewPassword={setConfirmNewPassword}
                                    handleUpdateProfile={handleUpdateProfile}
                                    handleCancelUpdate={handleCancelUpdate}
                                />
                            )}
                        </div>
                        {!showUpdateSection && (
                            <div className='mt-4'> <Button
                                label="Update Profile"
                                onClick={() => setShowUpdateSection(true)}
                            /></div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
