// UpdateProfileSection.jsx

import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { baseUrl } from '../url';

const UpdateProfileSection = ({ handleCancelUpdate, fetchUserData }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleValidation = () => {
        if (!username.trim()) {
            toast.error('Please enter your username.',{autoClose:1500});
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
        if (password && password.length < 6) {
            toast.error('Current password must be at least 6 characters long.');
            return false;
        }
        if (newPassword && newPassword.length < 6) {
            toast.error('New password must be at least 6 characters long.');
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error('New passwords do not match.');
            return false;
        }
        return true;
    };

    const handleUpdateProfile = async () => {
        if (!handleValidation()) return;
        const token = localStorage.getItem('token');
        try {
            const passwordValidationResponse = await fetch(`${baseUrl}/api/v1/user/validate-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password })
            });
    
            if (!passwordValidationResponse.ok) {
                const data = await passwordValidationResponse.json();
                toast.error(data.message);
                return;
            }
    
            const updateResponse = await axios.put(`${baseUrl}/api/v1/user/update`, {
                username,
                email,
                password,
                newPassword,
                confirmNewPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            toast.success(updateResponse.data.message);
            fetchUserData(); 
            handleCancelUpdate(); 
        } catch (error) {
            toast.error('Error updating profile. Please try again.');
        }
    };
    

    return (
        <div className="w-full flex flex-col mt-5 p-5 md:p-8 bg-white rounded-lg shadow-xl transition-all duration-500">
            <h2 className="text-2xl font-semibold mb-5">Update Profile</h2>
            <div className="space-y-3">
                <InputBox
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputBox
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputBox
                    label="Current Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputBox
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputBox
                    label="Confirm New Password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <div className="flex justify-between">
                    <Button label="Submit Update" onClick={handleUpdateProfile} />
                    <Button label="Cancel" onClick={handleCancelUpdate} variant="secondary" />
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileSection;
