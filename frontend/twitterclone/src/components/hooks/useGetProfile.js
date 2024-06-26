import { useEffect } from "react";
import { USER_API_END_POINT } from "../../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../../redux/userSlice";


const useGetProfile = async(id)=>{
    const dispatch = useDispatch();
useEffect(()=>{
    const fetchMyProfile = async ()=>{
    try{
const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
    withCredentials : true
});
dispatch(getMyProfile(res.data.user))
console.log(res);
    }catch(error){
         console.log(error)
    }

    }
    fetchMyProfile();
},[id])
}

export default useGetProfile;
