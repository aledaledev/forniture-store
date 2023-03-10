import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../features/products/productsSlice'
import favoriteReducer from '../features/favorite/favoriteSlice'
import cartReducer from '../features/cart/cartSlice'
import modalReducer from '../features/modal/modalSlice'
import formProductReducer from '../features/formProduct/formProductSlice'

export const store = configureStore({
    reducer:{
        products:productsReducer,
        favorite:favoriteReducer,
        cart:cartReducer,
        modal:modalReducer,
        formProduct:formProductReducer
    }
})