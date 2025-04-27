import React from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector} from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

function UserCard({user}) {

    const {_id, firstName, lastName, bio, age, gender, photoUrl, skills} = user;

    const feed = useSelector((store) => store.feed);
    const dispatch= useDispatch();
    

    const handleSendRequest = async (status, userId) => {
        try{
              const res = await axios.post(BASE_URL + "/request/send/" + status +"/" +userId, {}, {
                withCredentials: true,
              })
              dispatch(removeUserFromFeed(userId));
        }
        catch(err){
            console.log(err.message);
        }
    }
    
  return (
    <div className="card bg-base-300 w-[22rem] h-[39rem] shadow-sm mt-6 mb-6">
    <figure>
      <img
        src={photoUrl}
        alt="Photo" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      <p>{age && gender ? `${age}, ${gender}` : age || gender}</p>
      <p className='font-semibold'>{bio}</p>
      <div className="card-actions justify-center mt-2">
        <button className="btn btn-primary" onClick={() => handleSendRequest("ignore", _id)}>Ignore</button>
        <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard