import { Suspense } from 'react'
import { Outlet, Routes, Route } from 'react-router-dom'

import { Spinner } from '@/components/Elements'
import { MainLayout } from '@/components/Layout'
// import { MyTest } from '@/features/mytest'
import { lazyImport } from '@/utils/lazyImport'

const { MyTest } = lazyImport(() => import('@/features/mytest'), 'MyTest')

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="test" element={<MyTest />} />
    </Routes>
  )
}

export const protectedRoutes = [
  {
    path: 'app',
    element: <App />,
  },
  {
    path: 'app/*',
    element: <AppRoutes />,
  },
]
