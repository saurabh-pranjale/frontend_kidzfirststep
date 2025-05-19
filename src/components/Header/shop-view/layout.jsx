import React from 'react'
import { Outlet } from 'react-router-dom'

export const ShopLayout = () => {
  return (
    <div>
        <h1>Headre</h1>
        <Outlet />
    </div>
  )
}
