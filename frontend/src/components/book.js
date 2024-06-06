import { Button, Image } from '@nextui-org/react'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export default function Book() {

  let { id } = useParams()

  let navigate = useNavigate()

  const queryClient = useQueryClient()

  const {data: book} = useSuspenseQuery({
    queryKey: ["book"],
    queryFn: async () => {
        let data = await axios.get(`http://localhost:3002/books/${id}`)
        return data.data
    }
  })

  const session = JSON.parse(sessionStorage.getItem("session"))

  const {mutate: deleteBook, isPending} = useMutation({
    mutationFn: async () => {
      let res = await axios.delete(`http://localhost:3002/books/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries("book")
      navigate(`/books/${book._id}`)
    }
  })

  

  return (
    <div className='text-white md:flex my-10 container'>
      <Image src={book.bookData.image} className='basis-[50%] max-h-[500px]'/>
      <div className='ms-5 basis-[100%]'>
        <h1 className='text-6xl flex-1 my-4 text-start font-bold'>
          {book.bookData.title}
        </h1>
        <p className='my-4'>
          By : {book.bookData.authour}
        </p>
        <p className='text-lg'>
          <span className='font-extrabold'>About The Book : </span>{book.bookData.description}
        </p>
        {session?.role === "admin" ? 
        <div className='my-6'>
          <Button color='danger' radius='full' className='me-4' onClick={deleteBook} isDisabled={isPending}>Delete</Button>
            <Link to={`/books/edit/${book.bookData._id}`}>
              <Button color='primary' radius='full'>
                Edit
              </Button>

            </Link>
        </div>
          :
          null
        }
      </div>
    </div>
  )
}
