
import { Outlet } from 'react-router-dom'
import ShopHeader from './ShopHeader'
import KidzFirstFooter from '../KidzFirstFooter'

export const ShopLayout = () => {
  return (
    <div>
    
      <ShopHeader />
      <Outlet />
      <KidzFirstFooter />
    </div>
  )
}
