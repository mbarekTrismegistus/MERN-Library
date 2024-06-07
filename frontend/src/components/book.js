import { Button, Image, Textarea, Tooltip } from '@nextui-org/react'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { Suspense, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { HeartIcon } from './icons/heart'
import Comments from './comments'


export default function Book() {

  let { id } = useParams()

  let navigate = useNavigate()

  const queryClient = useQueryClient()
  const [isFav, setIsFav] = useState()
  

  const {data: book} = useSuspenseQuery({
    queryKey: ["book"],
    queryFn: async () => {
        let data = await axios.get(`http://localhost:3002/books/${id}`)
        return data.data
    }
  })
  const session = JSON.parse(sessionStorage.getItem("session"))

  const {data: favorite} = useSuspenseQuery({
    queryKey: ["favorite"],
    queryFn: async () => {
        let data = await axios.post(`http://localhost:3003/findfavorite`,  {
          data: {
            user_id: session?._id,
            book_id: book.bookData._id
          }
        })

        return data.data.data
    }
    
  })

 

  const {mutate: deleteBook, isPending} = useMutation({
    mutationFn: async () => {
      let res = await axios.delete(`http://localhost:3002/books/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries("book")
      navigate(`/`)
    }
  })



  const {mutate: addFav, isPending: addingFav, isIdle} = useMutation({
    mutationFn: async () => {
      if(!favorite.fav?._id){
        let res = await axios.post(`http://localhost:3003/favorite`, {
          data: {
            user_id: session?._id,
            book_id: book.bookData._id
          }
        })
       
        return res
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries("favorite")
      setIsFav(true)
    }
  })

  const {mutate: removeFav, isPending: removingFav, isIdle: isRIdle} = useMutation({
    mutationFn: async () => {
      if(favorite.fav?._id){
        let res = await axios.delete(`http://localhost:3003/favorite/${favorite.fav?._id}`)
        return res
      }
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries("favorite")
      setIsFav(false)
    }
  })

  function handleClick(){

    if(favorite.fav?._id){
      removeFav()
    }
    else{
      console.log(favorite.fav?._id)
      if(!isFav){
        addFav()
      }
    }
  }
  

  return (
    <div>
      <div className='text-white md:flex my-10 container backdrop-blur-md px-5'>
        <Image src={book.bookData.image} className='basis-[50%] max-h-[500px]'/>
        <div className='ms-5 flex basis-[100%]'>
          <div className='flex-1'>
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
          <div className='my-4 me-7'>
            {session?._id ?
            <Button variant={`${favorite.fav?._id ? "shadow" : "flat"}`} radius='full' color='danger' isIconOnly isDisabled={addingFav || removingFav} onClick={handleClick}><HeartIcon/></Button>
              :
              <Tooltip content="Login to Add To Favorite" color='danger'>
                <Button radius='full' variant='flat' color='danger' isIconOnly><HeartIcon/></Button>
              </Tooltip>
              
            }
            <p className='text-white text-center mt-2'>{favorite.count}</p>
          </div>
        </div>

      </div>
      <Suspense fallback={"Loading ..."}>
        <Comments book={book.bookData._id} image={session?.image} username={session?.username}/>
      </Suspense>
    </div>
  )
}
