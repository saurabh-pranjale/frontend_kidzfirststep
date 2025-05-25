import { configureStore } from "@reduxjs/toolkit";
import authSlice from './auth/index'
import productSlice from './shop/index'
import cartSlice from './cart/index'

const store = configureStore({
    reducer:{
       auth: authSlice, 
       shopProducts:productSlice,
       shopCart:cartSlice
    }
})


export default store