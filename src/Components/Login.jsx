import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants.JS';

function Login() {

  const[emailId, setEmailId] = useState("virat@gmail.com");
  const[password, setPassword] = useState("Kohli@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post( BASE_URL + "/login", {
        emailId,
        password,
      }, {withCredentials: true})
      dispatch(addUser(res.data));
      return navigate("/");
    }
    catch(err){
      console.error(err);
    }
    
  }

  return (
    <div className='flex justify-center items-center min-h-[550px]'>
    <div className="card bg-base-300 w-96 shadow-sm ">
  <div className="card-body flex items-center justify-center">
    <h2 className=" card-title">Login</h2>
    <div>

        <label className="input validator my-3 ml-2"> 
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input 
      type="email"
      value={emailId}
      placeholder="mail@site.com"
      onChange={(e) => setEmailId(e.target.value)}
      required />
        </label>
    <div className="validator-hint hidden">Enter valid email address</div>

    <label className="input validator my-3 ml-2">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
  />
    </label>


    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login