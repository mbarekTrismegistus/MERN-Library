import { Button, Input, Textarea } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddBook() {

    const [data, setData] = useState({})
    const [mount, setMount] = useState(false)

    const navigate = useNavigate();
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

    function getBase64(file, onLoadCallback) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() { resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function handleChange(e){
        if(e.target.type === "file"){
                    
            var promise = getBase64(e.target.files[0]);
            promise.then(function(result) {
             setData((prevData) => {
                return{
                    ...prevData,
                    [e.target.name]: result
                }
        })})}
        setData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const {mutate: add} = useMutation({
        mutationFn: async () => {
            await axios.post("http://localhost:3002/books", {data})
        },
        onSuccess: () => {
            console.log("done")
            navigate("/")
        }
    })


  return(
      mount ?
      <div className='container'>
          <h1 className='text-5xl font-bold text-white my-7'>
              Add A new Book
          </h1>
          <div>
              <Input type='text' onChange={handleChange} label="Title" name='title' className='my-5'/>
              <Input type='text' onChange={handleChange} label="Author" name='authour' className='my-5'/>
              <Textarea label="Description" placeholder='Enter a description' name='description' onChange={handleChange}/>
              <input type='file' name="image" onChange={handleChange}/>
              <Button color='primary' onClick={add}>
                  Add
              </Button>
              
          </div>
      </div>
      :
      <div>
          "loading ..."
      </div>
    
  )
  
}
