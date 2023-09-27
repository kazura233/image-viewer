import { Routes, Route } from 'react-router-dom'
import Index from '~/pages'

export const RootRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<Index />}></Route>
    </Routes>
  )
}
