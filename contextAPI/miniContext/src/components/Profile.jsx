import React, {useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    // user global state hai, context ke dwaara usko leke aao
    const {user} = useContext(UserContext)  
    if(!user){
        return <div>Please Login</div>
    } else{
        return <h1>Welcome {user.username}</h1>
    }
}

export default Profile