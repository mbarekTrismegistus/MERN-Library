import { Avatar, Button, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'

export default function Comments(props) {

    const [content, setContent] = useState("")
    const queryClient = useQueryClient()

    const {data: comments} = useSuspenseQuery({
        queryKey: ["comments"],
        queryFn: async () => {
            let data = await axios.get(`http://localhost:3004/books/${props.book}/comments`)
            console.log(data.data)
            return data.data
        }
    })

    const {mutate: addComment, isPending} = useMutation({
        mutationFn: async () => {
            await axios.post(`http://localhost:3004/books/comments`, {
                data: {
                    content: content,
                    user_image: props.image,
                    book_id: props.book,
                    username: props.username
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries("comments")
        }
    })

  return (
    <div className='p-5 text-white'>
        <h1 className='text-3xl font-bold text-white mb-5'>Comments</h1>
        <div className='flex gap-4'>
          <Textarea label="Comment" isDisabled={props.username ? false : true} placeholder='Add a Comment' onChange={(e) => setContent(e.target.value)} name='content'/>
          <Button color='primary' variant='flat' isDisabled={isPending || props.username ? false : true} onClick={addComment}>Add Comment</Button>
        </div>
        <div>
            {comments.map((c) => {
                return(
                    <div className='flex p-5 items-center'>
                        <Avatar isBordered color='primary' src={c.user_image} size='lg'/>
                        <div className='ms-5'>
                            <p className='font-bold'>{c.username}</p>
                            <p>{c.content}</p>
                        </div>
                    </div>
                )
            })}
        </div>

    </div>
  )
}
