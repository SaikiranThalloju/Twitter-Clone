import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className="w-[25%]">
      <div className="p-2 flex items-center  bg-gray-100 outline-none rounded-full">
        <CiSearch size="20px" />
        <input
          className="outline-none  bg-transparent px-2"
          type="text"
          placeholder="search"
        />
      </div>

      <div className="p-4  bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg">Who to follow</h1>

        {otherUsers?.map((user) => {
          return (
            <div key={user?._id} className="flex items-center justify-between my-3">
              <div className="flex">
                <div>
                  <Avatar name="Nitish" size="40" round={true} />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.name}`}</p>
                </div>
              </div>
              <div>
                <Link to = {`/profile/${user?._id}`}>
                <button className="px-4 py-1 bg-black text-white rounded-full">
                  Profile
                </button></Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
