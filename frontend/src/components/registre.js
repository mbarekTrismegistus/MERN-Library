import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function Registre() {

    const navigate = useNavigate()
    const [mount, setMount] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const [errInfo, setErrInfo] = useState("blah")

    useEffect(() => {
        if(sessionStorage.getItem("session")){
            navigate("/")
        }
        else{
            setMount(true)
        }

    },[sessionStorage.getItem("session")])

    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [image, setImage] = useState("")

    function getBase64(file, onLoadCallback) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() { resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function handleChange(e){
        var promise = getBase64(e.target.files[0]);
        promise.then(function(result) {
            setImage(result)})

    }

    const {mutate: registre, isPending, isError} = useMutation({
        mutationFn: async () => {
            let data = await axios.post("http://localhost:3001/auth/registre", {data: {
                username: username,
                password: pass,
                image: image
            }},{ withCredentials: true })
            return data
        },
        onSuccess: async (data) => {
            await axios.post("http://localhost:3001/auth", {data: {
                username: username,
                password: pass,
                
            }},{ withCredentials: true })
            sessionStorage.setItem("session", JSON.stringify(data.data))
            navigate(0)
        },
        onError: (data) => {
            console.log(data.response.status)
            if(data.response.status == 409){

            }
            setErrInfo("username already taken")
            setErrMsg(true)
        }
    })

    

  return (
    mount ? 

    <div>
        <h1 className='text-5xl font-extrabold text-white my-[50px]'>
            Create An Account
        </h1>
        <div>
            <Input type='text' isInvalid={errMsg} errorMessage={errInfo} onChange={(e) => setUsername(e.target.value)} label="Username" className='my-5'/>
            <Input type='text' isInvalid={errMsg} errorMessage={errInfo} onChange={(e) => setPass(e.target.value)} label="Password" className='my-5'/>
            <input type='file' onChange={(e) => handleChange(e)}></input>
            <Button color='primary' onClick={registre}>
                Registre
            </Button>
            
        </div>
    </div>
    :
    <div className='dark:text-white'>
        Loading ...
    </div>
  )
}
