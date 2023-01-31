import React from 'react'

export type TimerHandle = {
  clear: () => void
}

type TimerProps = {
  duration?: number
  value?: number
}

export const Timer = React.forwardRef<TimerHandle, TimerProps>(
  ({ duration = 1000, value = 0 }, ref) => {
    const [count, setCount] = React.useState(value)

    React.useImperativeHandle(ref, () => ({
      clear: () => {
        setCount(0)
      },
    }))

    React.useEffect(() => {
      const id = setInterval(() => {
        setCount((c) => c + 1)
      }, duration)

      return () => clearInterval(id)
    })

    return <div className="text-3xl bg-sky-100 p-2 text-rose-500 rounded-full">{count}</div>
  }
)

Timer.displayName = 'Timer'
