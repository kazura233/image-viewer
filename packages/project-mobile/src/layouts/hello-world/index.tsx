import { Outlet } from 'react-router-dom'

export const LayoutHelloWorld: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default LayoutHelloWorld
