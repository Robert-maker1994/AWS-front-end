import React, {useState} from 'react'
import { useHistory } from "react-router";
import { login } from '../routing/routing';

function Profile() {
    const user = useState(localStorage.getItem("user"));
   console.log(user)
   let history = useHistory()
    return (
        <div>
{   !user ? history.push(login) :      <h1>ello</h1>
 
 
}
        </div>
    )
}

export default Profile
