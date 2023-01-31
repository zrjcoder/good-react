import React from 'react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'

import { Spinner } from '@/components/Elements'
import { AuthProvider } from '@/lib/auth'
import { queryClient } from '@/lib/react-query'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>{children}</Router>
        </AuthProvider>
      </QueryClientProvider>
    </React.Suspense>
  )
}
