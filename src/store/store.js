import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth/index'
import productSlice from './shop/index'
import cartSlice from './cart/index'
import shopSlice from './order/index'
import addressSlice from './shop/address-slice/index'

const store = configureStore({
    reducer:{
       auth: authSlice, 
       shopProducts:productSlice,
       shopCart:cartSlice,
       shopOrder:shopSlice,
       shopAddress: addressSlice
    }
})


export default store