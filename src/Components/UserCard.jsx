import React from 'react'

function userCard({user}) {

    const {firstName, lastName, bio, age, gender, photoUrl, skills} = user;
    
  return (
    <div className="card bg-base-300 w-[22rem] shadow-sm mt-6 mb-6">
    <figure>
      <img
        src={photoUrl}
        alt="Photo" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      <p>{age && gender ? `${age}, ${gender}` : age || gender}</p>
      <p className='font-semibold'>{bio}</p>
      <div className="card-actions justify-center">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>
      </div>
    </div>
  </div>
  )
}

export default userCard