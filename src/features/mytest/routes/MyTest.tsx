import React from 'react'

import { Button } from '@/components/Elements'

import { Timer, TimerHandle } from '../components'

export const MyTest = () => {
  const myRef = React.useRef<TimerHandle>(null)

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <Timer ref={myRef} />
      <Button
        onClick={() => {
          if (myRef.current) {
            myRef.current.clear()
          }
        }}
      >
        归零
      </Button>
    </div>
  )
}
