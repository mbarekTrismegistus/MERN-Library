import { Button, Input, Textarea } from '@nextui-org/react'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditBook() {


    const { id } = useParams()

    

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
        console.log(e.target.value)
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

    const {data: book} = useSuspenseQuery({
        queryKey: ["book"],
        queryFn: async () => {
            let data = await axios.get(`http://localhost:3002/books/${id}`)
            return data.data
        }
      
    })

    

    const {mutate: editBook, isPending: isUpdating} = useMutation({
        mutationFn: async () => {
          let res = await axios.post(`http://localhost:3002/books/edit/${id}`, {data: data})
        },
        onSuccess: () => {
          navigate("/")
        }
    })



  return(
      mount ?
      <div className='container'>
          <h1 className='text-5xl font-bold text-white my-7'>
              Edit Book
          </h1>
          <div>
              <Input type='text' defaultValue={book.bookData.title} onChange={handleChange} label="Title" name='title' className='my-5'/>
              <Input type='text' defaultValue={book.bookData.authour} onChange={handleChange} label="Author" name='authour' className='my-5'/>
              <Textarea label="Description" defaultValue={book.bookData.description} placeholder='Enter a description' name='description' onChange={handleChange}/>
              <input type='file' name="image" onChange={handleChange}/>
              <Button color='primary' isDisabled={isUpdating} onClick={editBook}>
                  Edit
              </Button>
              
          </div>
      </div>
      :
      <div>
          "loading ..."
      </div>
    
  )
  
}
