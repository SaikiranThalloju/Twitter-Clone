import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../utils/constants';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';


const LeftSidebar = () => {
  const {user} = useSelector(store=>store.user);
   const navigate = useNavigate();
   const dispatch = useDispatch()

  const logOutHandler = async ()=>{
try{
const res = await axios.get(`${USER_API_END_POINT}/logout`);
dispatch(getUser(null));
dispatch(getOtherUsers(null));
dispatch(getOtherUsers(null));
dispatch(getMyProfile(null));




navigate("/login")
    
       toast.success(res.data.message)
}catch(error){
  
  
      
console.log(error)
}
  }

  return (
    <div className='w-[20%] m-3' >
      <div>
        <img className='ml-4' width={"24px"} src = "https://www.freepnglogos.com/elon-musk-twitter-rebrand-x-logo-2.png" alt = ""/>
      </div>
      <div className='my-4'>
        <Link to = "/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full hover:cursor-pointer'>
          <GoHomeFill size={"24px"}/>
          <h1 className='font-bold text-lg ml-2'>Home</h1>
        </Link>

        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full hover:cursor-pointer'>
          <CiHashtag size={"24px"}/>
          <h1 className='font-bold text-lg ml-2'>Explore</h1>
        </div>

        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full hover:cursor-pointer'>
          <IoIosNotificationsOutline size={"24px"}/>
          <h1 className='font-bold text-lg ml-2'>Notifications</h1>
        </div>

        <Link to = {`profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full hover:cursor-pointer'>
          <CiUser size={"24px"}/>
          <h1 className='font-bold text-lg ml-2'>Profile</h1>
        </Link>

        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full hover:cursor-pointer'>
          <CiBookmark size={"24px"}/>
          <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
        </div>

        <div onClick={logOutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full hover:cursor-pointer'>
          <AiOutlineLogout size={"24px"}/>
          <h1 className='font-bold text-lg ml-2'>Logout</h1>
        </div>

        <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full font-bold '>Post</button>

        

        

      </div>
    </div>
  )
}

export default LeftSidebar
