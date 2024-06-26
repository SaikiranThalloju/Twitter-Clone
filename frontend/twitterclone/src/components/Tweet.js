import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constants";
import { CiBookmark } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { timeSince } from "../utils/constants";

const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
     
        toast.success(res.data.message);
    
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };


  const deleteTweetHandler = async (id)=>{
   try{
       axios.defaults.withCredentials = true;
       const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
       dispatch(getRefresh());
       toast.success(res.data.message);

   }catch(error){
    console.log(error);
    toast.success(error.response.data.message);

   }
  }

  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar name="Saikiran Thalloju" size="40" round={true} />
          <div className="ml-2 w-full">
            <div className="flex items-center ">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">{`@${tweet?.userDetails[0]?.username}.${timeSince(tweet?.createdAt)}`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer ">
                  <FaRegComment size="24px" />
                </div>
                <p>0</p>
              </div>
              <div onClick={() => likeOrDislikeHandler(tweet?._id)}
              className="flex items-center">
                <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer ">
                  <CiHeart size="24px" />
                </div>

                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center ">
                <div className="p-2 hover:bg-gray-400 rounded-full cursor-pointer ">
                  <CiBookmark size="24px" />
                </div>
                <p>0</p>
              </div>
              {
                user?._id === tweet?.userId &&(
                  <div onClick={()=>deleteTweetHandler(tweet?._id)} className="flex items-center">
                <div className="p-2 hover:bg-yellow-400 rounded-full cursor-pointer ">
                  <MdOutlineDeleteOutline size="24px" />
                </div>
                
              </div>
                )
              }
              


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
