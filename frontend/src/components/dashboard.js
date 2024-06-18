import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

    const navigate = useNavigate();

    const [mount, setMount] = useState(false)


    
    useEffect(() => {
        if(sessionStorage.getItem("session")){
            let role = JSON.parse(sessionStorage.getItem("session"))
            console.log(role.role)
            if(role.role !== "admin"){
                navigate("/")
            }
            else{
                setMount(true)
            }
        }
        else{
            navigate("/")
        }

    },[sessionStorage.getItem("session")])

  return (
    mount ?
    <div>
        <p className='text-6xl font-extrabold text-white'>
            Dashboard
        </p>
    </div>
    :
    <div>Loading ...</div>
  )
}
