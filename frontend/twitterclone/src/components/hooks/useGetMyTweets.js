import { useEffect } from "react";
import { TWEET_API_END_POINT } from "../../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../../redux/tweetSlice";

const useGetMyTweets = async (id) => {
  const dispatch = useDispatch();
  const { refresh,isActive } = useSelector((store) => store.tweet);
// const{user} = useSelector(store=>store.user)


  const fetchMyTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/getalltweets/${id}`, {
        withCredentials: true,
      });
      dispatch(getAllTweets(res.data.tweets));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const followingTweetHandler = async () => {
     axios.defaults.withCredentials = true
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweets/${id}`
      );
      dispatch(getAllTweets(res.data.tweets));
      
    } catch (error) {
      
      console.log(error);
    }
  };
  useEffect(() => {
    if(isActive){
      fetchMyTweets();
    }else{
      followingTweetHandler();
    }
  }, [isActive,refresh]);
};

export default useGetMyTweets;
