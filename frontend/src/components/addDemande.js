import { Button, Input, Textarea } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function AddDemande() {

    const [data, setData] = useState({})
    const session = JSON.parse(sessionStorage.getItem("session"))

    const navigate = useNavigate()

    function handleChange(e){
        setData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const {mutate: add} = useMutation({
        mutationFn: async () => {
            await axios.post("http://localhost:3005/demands", {
                ...data,
                userId: session._id
            })
        },
        onSuccess: () => {
            navigate("/")
        }
    })


  return(

      <div className='container'>
          <h1 className='text-5xl font-bold text-white my-7'>
              Add A new Book
          </h1>
          <div>
              <Input type='text' onChange={handleChange} label="Title" name='title' className='my-5'/>
              <Input type='text' onChange={handleChange} label="Author" name='authour' className='my-5'/>
              <Button color='primary' onClick={add}>
                  Add
              </Button>
              
          </div>
      </div>
    
  )
  
}
