import React from 'react'
import { useState } from 'react';
import UserCard from "./UserCard"
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


function EditProfile({user}) {

      const [firstName, setFirstName] = useState(user.firstName);
      const [lastName, setLastName] = useState(user.lastName);
      const[age, setAge] = useState(user.age || "");
      const[photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
      const[gender, setGender] = useState(user.gender || "");
      const[bio, setBio] = useState(user.bio || "")
      const[error, setError] = useState("");
      const[showToast, setShowToast] = useState(false);
      const dispatch = useDispatch();
     
    const saveProfile = async() => {
        setError("");
        try {
            const res = await axios.patch(
              BASE_URL + "/profile/edit",
              {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                bio,
              },
              { withCredentials: true }
            );
           
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false)
            }, 3000)
        }
        catch(err){
            
            setError(err?.response?.data || "Something went wrong");
        }
    }


  return (
    <>
    <div className='flex justify-center gap-10 items-center  min-h-screen max-h-[100vh]  overflow-y-auto  bg-gradient-to-r from-slate-800 via-purple-900 to-black'>
    <div className="card bg-base-300 w-[23rem]  shadow-sm  ">
  <div className="card-body mr-2">
    <h2 className=" card-title mx-auto"> Edit Profile</h2>
    <div>

    <legend className="fieldset-legend">First Name</legend>
    <fieldset className="fieldset">
  
  <input className="input ml-2"
         placeholder="First Name"
         value={firstName}
         onChange={(e) => setFirstName(e.target.value)}>
       </input>
  
</fieldset>

<legend className="fieldset-legend">Last Name</legend>
<fieldset className="fieldset">

  <input className="input ml-2"
         placeholder="Last Name"
         value={lastName}
         onChange={(e) => setLastName(e.target.value)}>
         </input>

</fieldset>

<legend className="fieldset-legend">Age</legend>
<fieldset className="fieldset">

  <input className="input ml-2"
         placeholder="Age"
         value={age}
         onChange={(e) => setAge(e.target.value)}>
         </input>

</fieldset>

<legend className="fieldset-legend">Photo URL</legend>
<fieldset className="fieldset">

  <input className="input ml-2"
         placeholder="Photo URL"
         value={photoUrl}
         onChange={(e) => setPhotoUrl(e.target.value)}>
         </input>

</fieldset>

<legend className="fieldset-legend">Gender</legend>
<fieldset className="fieldset">

  <input className="input ml-2"
         placeholder="Gender"
         value={gender}
         onChange={(e) => setGender(e.target.value)}>
         </input>

</fieldset>



<legend className="fieldset-legend">Bio</legend>
<fieldset className="fieldset">

  <input className="input ml-2"
         placeholder="Bio"
         value={bio}
         onChange={(e) => setBio(e.target.value)}>
         </input>

</fieldset>



  


    </div>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
    
    
  </div>
    </div>
    
     <UserCard user={{firstName, lastName, photoUrl, age, gender, bio}}/>
     
     <div className="toast toast-top toast-center">
 

 {showToast &&( <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
 )}
</div>
 
</div>
 


</>
  )
}

export default EditProfile