import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button';
import UserSkeleton from '../skeletons/UserSkeleton';

const SingleUser = ({ user, loading }) => {

    const navigate = useNavigate();
    if (loading) {
        return <UserSkeleton />;
    }

    return (
        <>
            <div className="shadow-md items-center mb-2 rounded-md md:flex-row flex justify-between p-2 ">
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
        </>
    )
}

export default SingleUser