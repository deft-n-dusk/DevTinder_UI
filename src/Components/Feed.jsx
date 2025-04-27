import axios from 'axios'
import React, {  useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';


function Feed() {
  const feed = useSelector((store) => store.feed);
  
  const dispatch = useDispatch();

  const getFeed = async() => {
    if (feed.length > 0) return;
    
     try { const res = await axios.get(BASE_URL + "/user/feed", {withCredentials : true},);
      dispatch(addFeed(res.data));
    }
   catch(err){

  }
};

useEffect(() => {
  getFeed();
}, []);

if(!feed) return;

if(feed.length === 0)  return (
  <div className="flex justify-center items-center my-52  w-full ">
      <div className="bg-base-300 p-10 rounded-2xl shadow-lg w-96 text-center border border-gray-500" >
          <h1 className="text-xl font-normal">
          Database looks quiet 📭
          </h1>
      </div>
  </div>
);



  return feed && (
   
    <div className='flex justify-center items-center bg-gradient-to-r  from-slate-800 via-purple-900 to-black'>
       {feed[0] && <UserCard user={feed[0]} />}
    </div>
  )
}

export default Feed