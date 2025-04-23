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
if (feed && feed.length > 0) {
  console.log('Feed data:', feed);  // Log when data is available
}

  return feed && (
   
    <div className='flex justify-center items-center'>
       {feed[0] && <UserCard user={feed[0]} />}
    </div>
  )
}

export default Feed