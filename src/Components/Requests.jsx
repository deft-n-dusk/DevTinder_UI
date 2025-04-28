import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestsSlice';

function Requests() {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    

    const reviewRequests = async(status, _id) => {
        try{
                const res = axios.post(BASE_URL + "/request/review/"+ status + "/" + _id, {}, 
                    {
                        withCredentials:true,
                    }
                )
                dispatch(removeRequests(_id))
        }
        catch(err){
            console.log(err.message);
        }
    }

    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/recieved", {
                withCredentials : true,
            })
        dispatch(addRequests(res?.data?.data));
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (requests.length === 0) 
        return (
            <div className="flex justify-center items-center my-52 h-[25vh] w-full ">
                <div className="bg-gradient-to-r from-slate-800 via-purple-900 to-black p-10 rounded-2xl shadow-lg w-3/5 text-center">
                    <h1 className="text-2xl font-normal">
                    No requests yet — but the right commit will hit soon! 💻
                    </h1>
                </div>
            </div>
        );
    

  return (
    <div className='text-center justify-center  min-h-[600px] bg-gradient-to-r from-slate-800 via-purple-900 to-black'>
        <h1 className='text-bold pt-5 text-3xl'>Connection Requests</h1>
        {
            requests.map((request) => {
                const {_id, firstName, lastName, gender, age, bio, skills, photoUrl} = request?.fromUserId;
                return(
                    <div key={_id} className='flex relative h-44  m-8 mx-auto rounded-lg border border-gray-500 bg-base-300 w-4/12 '>
                        <div className='m-7'><img className=' rounded-full w-20  ' src={photoUrl} alt="Photo" /></div>
                        <div className='my-7 text-left text-gray-400'><h2 className=' text-white font-semibold text-xl mb-2'>{firstName + " " + lastName}</h2>
                            <p className=' '>{bio}</p>
                            <p>{age && gender ? `Age - ${age}, Gender - ${gender}` : age ? `Age - ${age}` : gender ? `Gender - ${gender}` : null}</p>
                            {skills?.length > 0 && <p>Skills – {skills.join(", ")}</p>}
                        </div>  
                        <div className='flex gap-2 bottom-1 mb-3 absolute right-5 pt-5'>
                        <button className="btn btn-primary" onClick={() => reviewRequests("rejected", request._id)}> Reject</button>
                        <button className="btn btn-secondary" onClick={() => reviewRequests("accepted", request._id)}> Accept</button>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Requests