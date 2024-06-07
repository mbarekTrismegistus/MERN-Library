import React, { Suspense } from 'react'
import Books from './books'
import { Skeleton } from '@nextui-org/react'

export default function Home() {
  return (
    <div>
        <h1 className='text-5xl my-7 text-white font-extrabold'>
            Latest Books
        </h1>
      <Suspense fallback={
        <div className='grid grid-cols-3 justify-center gap-5'>
          <Skeleton className='rounded-lg'>
            <div className='py-4 h-[400px]'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='py-4 h-[400px]'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='py-4 h-[400px]'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='py-4  h-[400px]'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='py-4 h-[400px]'></div>
          </Skeleton>
          <Skeleton className='rounded-lg'>
            <div className='py-4 h-[400px]'></div>
          </Skeleton>
        </div>
      }>
        <Books/>
      </Suspense>
    </div>
  )
}
