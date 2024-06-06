import React, { Suspense } from 'react'
import Books from './books'

export default function Home() {
  return (
    <div>
      <Suspense fallback={"loading..."}>
        <Books/>
      </Suspense>
    </div>
  )
}
