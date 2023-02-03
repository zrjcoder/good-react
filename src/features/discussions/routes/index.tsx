import { Navigate, Route, Routes } from 'react-router-dom'

import { Discussions } from './Discussions'

export const DiscussionsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Discussions />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
