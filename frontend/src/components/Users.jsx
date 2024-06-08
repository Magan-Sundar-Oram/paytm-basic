import React, { useState, useEffect } from 'react'
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {baseUrl} from '../url'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("F")
    const [loggedInUser, setLoggedInUser] = useState(null)

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/user/inuser`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setLoggedInUser(response.data.userData);
            } catch (error) {
                console.log("Error while fetching logged-in user data: " + error);
            }
        };

        if (isAuthenticated) {
            fetchLoggedInUser();
        }
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/user/bulk?filter=${filter}`);
                setUsers(response.data.users)
            } catch (error) {
                console.log("Error while fetching data" + error)
            }
        }
        fetchData()
    }, [filter])


    const filteredUsers = users.filter(user => {
        const excludeUser = loggedInUser && user._id === loggedInUser.userId;
        return !excludeUser;
    });



    return (
        <>
            <div className="font-medium mt-6 text-xl">
                Users 👤
            </div>
            <div className="my-2">
                <input onChange={(e) => {
                    setFilter(e.target.value)
                }}
                    type="text" placeholder="Search users..." 
                    className="w-full px-2 py-3 border rounded-md border-slate-200"/>
            </div>
            <div>
                {filteredUsers.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    )
}
function User({ user }) {

    const navigate = useNavigate();

    return <div className="shadow-md items-center mb-2 rounded-md md:flex-row flex justify-between p-2 ">
        <div className="flex items-center">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.username[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div className='text-xl'>
                    {user.username}
                </div>
            </div>
        </div>

        <div className="flex items-center flex-col justify-center h-full">
            <Button onClick={(e) => {
                navigate("/sendmoney?id=" + user._id + "&username=" + user.username)
            }}
                label={"Send Money"} />
        </div>
    </div>
}

export default Users
