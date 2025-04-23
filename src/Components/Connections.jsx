import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectonsSlice';

function Connections() {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();

    const fetchConnections = async() => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials:true,
            })
            dispatch(addConnections(res?.data?.data));
            
        }
        catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    
    if (connections.length === 0) 
        return (
            <div className="flex justify-center items-center my-52  w-full">
                <div className="bg-base-300 p-10 rounded-2xl shadow-lg w-3/5 text-center">
                    <h1 className="text-2xl font-normal">
                    🤝 No connections? No problem. Let’s make some magic happen! ✨
                    </h1>
                </div>
            </div>
        );
    

  return (
    <div className='text-center justify-center my-5 '>
        <h1 className='text-bold text-3xl'>Connections</h1>
        {
            connections.map((connections) => {
                const {_id, firstName, lastName, gender, age, bio, skills, photoUrl} = connections;
                return(
                    <div key={_id} className='flex m-8 mx-auto rounded-lg border border-gray-500 bg-base-300 w-4/12'>
                        <div className='m-7'><img className=' rounded-full w-20 h-20  ' src={photoUrl} alt="Photo" /></div>
                        <div className='my-7 text-left text-gray-400'><h2 className=' text-white font-semibold text-xl mb-2'>{firstName + " " + lastName}</h2>
                            <p className=' '>{bio}</p>
                            <p>{age && gender ? `Age - ${age}, Gender - ${gender}` : age ? `Age - ${age}` : gender ? `Gender - ${gender}` : null}</p>
                            <p>{skills &&  "Skills - " + skills.join(", ")}</p>
                        </div>  
                        
                    </div>
                )
            })
        }
    </div>
  )
}

export default Connections