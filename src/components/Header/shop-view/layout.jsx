
import { Outlet } from 'react-router-dom'
import Navabar from '../Navabar'

export const ShopLayout = () => {
  return (
    <div>
    
      <Navabar />
      <Outlet />
    </div>
  )
}
