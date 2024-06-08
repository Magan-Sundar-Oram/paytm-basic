import React from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const UpdateProfileSection = ({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    handleUpdateProfile,
    handleCancelUpdate,
}) => {
    return (
        <div className="w-full flex flex-col mt-5  p-5 md:p-8 bg-white rounded-lg shadow-xl transition-all duration-500">
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
