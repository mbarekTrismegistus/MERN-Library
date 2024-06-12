import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import axios from 'axios'
import {Card, CardHeader, CardBody, Image, Button, CardFooter, Link} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


export default function Books() {

    const {data: books} = useSuspenseQuery({
        queryKey: ["books"],
        queryFn: async () => {
            let data = await axios.get("http://localhost:3002/books")
            return data.data
        }
    })


  return (
    <div>

        <div className='grid grid-cols-3 justify-center gap-5'>
            
            {books.booksData.map((b) => {
                return (
                    <Card className="py-4" isFooterBlurred key={b._id}>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="font-bold">{b.title}</p>
                            <small className=" uppercase text-tiny text-default-500">{b.authour}</small>
                            <h4 className="font-bold my-4 text-large">{b.description?.substring(0, 50) + " ..."} <Button size='sm' radius='full' color='secondary' variant='bordered' as={Link} href={`/books/${b._id}`}>See More</Button></h4>
                        </CardHeader>
                        <CardBody className="items-center overflow-visible py-2">
                            <Image
                                isZoomed
                                alt="Card background"
                                className="object-cover rounded-xl h-[300px]"
                                src={b.image}
                                width={270}
                            />
                        </CardBody>
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                            <p className="text-tiny text-white/80">Available soon.</p>
                            <Button className="text-tiny text-white" color="primary" radius="full" size="sm">
                                Notify me
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    </div>
  )
}
