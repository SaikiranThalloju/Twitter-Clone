import { useEffect } from "react";
import { USER_API_END_POINT } from "../../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../../redux/userSlice";


const useOtherUsers = async(id)=>{
    const dispatch = useDispatch();
useEffect(()=>{
    const fetchOtherUsers = async ()=>{
    try{
const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`,{
    withCredentials : true
});
dispatch(getOtherUsers(res.data.otherUsers))
console.log(res);
    }catch(error){
         console.log(error)
    }

    }
    fetchOtherUsers();
},[])
}

export default useOtherUsers;