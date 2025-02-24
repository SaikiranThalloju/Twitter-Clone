import React,{useEffect} from 'react'
import LeftSidebar from '../components/LeftSidebar'
// import Feed from '../components/Feed'
import RightSidebar from '../components/RightSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOtherUsers from "./hooks/useotherUsers"
import useGetMyTweets from './hooks/useGetMyTweets'
const Home = () => {
// custom hook
const{user,otherUsers} = useSelector(store=>store.user)
const navigate = useNavigate();


useEffect(()=>{
  if(!user){
    navigate("/login");
  }
},[]);


useOtherUsers(user?._id);
useGetMyTweets(user?._id);


  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSidebar/>
      <Outlet/>
      <RightSidebar otherUsers = {otherUsers}/>
    </div>
  )
}

export default Home
