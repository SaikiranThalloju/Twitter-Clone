// import React, { useState } from "react";
// import { USER_API_END_POINT } from "../utils/constants";
// import axios from "axios"
// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   axios.defaults.withCredentials = true;

//   const submitHandler = async (e)=>{
//     e.preventDefault();
//     if(isLogin){
//         const res = await axios.post(`${USER_API_END_POINT}/login`, {email,password});
//         console.log(res);
//     }else{
//       try{
//         const res =  await axios.post(`${USER_API_END_POINT}/register`,{name,username,email,password});
//          console.log(res);
//       }catch(error){
//            console.log(error);
//       }
//     }
//   }
//   const loginSignUpHandler = () => {
//     setIsLogin(!isLogin);
//     console.log("login");
//   };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <div className="flex items-center justify-evenly w-[80%] ">
//         <div>
//           <img
//             className="ml-4"
//             width={"300px"}
//             src="https://www.freepnglogos.com/elon-musk-twitter-rebrand-x-logo-2.png"
//             alt=""
//           />
//         </div>
//         <div>
//           <div className="my-5">
//             <h1 className="font-bold text-6xl">Happening Now</h1>
//           </div>
//           <h1 className="text-2xl font-bold mt-4 mb-2">
//             {isLogin ? "Login" : "Signup"}
//           </h1>
//           <form onSubmit={submitHandler} className=" flex flex-col w-[55%]">
//             {!isLogin && (
//               <>
//                 <input
//                   type="text"
//                   value={name}
//                   placeholder="Name"
//                   onChange={(e) => setName(e.target.value)}
//                   className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
//                 />
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUserName(e.target.value)}
//                   placeholder="Username"
//                   className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
//                 />
//               </>
//             )}
//             <input
//               type="email"
//               placeholder="Email"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//               className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
//             />
//             <button className="bg-[#1D9BF0] border-none rounded-full py-2 text-white text-lg my-4">
//               {isLogin ? "Login" : "Create Account"}
//             </button>
//             <h1>
//               {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//               <span
//                 onClick={loginSignUpHandler}
//                 className="text-blue-500 font-bold cursor-pointer"
//               >
//                 {isLogin ? "Signup" : "Login"}
//               </span>
//             </h1>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { USER_API_END_POINT } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { getUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // axios.defaults.withCredentials = true;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
        }
        console.log(res);
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          { name, username, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
       
        console.log(res);
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.error("Error:", error);
      }
    }
  };

  const loginSignUpHandler = () => {
    setIsLogin(!isLogin);
    console.log("login");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="ml-4"
            width={"300px"}
            src="https://www.freepnglogos.com/elon-musk-twitter-rebrand-x-logo-2.png"
            alt=""
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-6xl">Happening Now</h1>
          </div>
          <h1 className="text-2xl font-bold mt-4 mb-2">
            {isLogin ? "Login" : "Signup"}
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col w-[55%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <button className="bg-[#1D9BF0] border-none rounded-full py-2 text-white text-lg my-4">
              {isLogin ? "Login" : "Create Account"}
            </button>
            <h1>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={loginSignUpHandler}
                className="text-blue-500 font-bold cursor-pointer"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
