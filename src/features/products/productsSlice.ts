import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../../types";

const initialState:ProductState = {
    products:[],
    sortedProducts:[]
}

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setProducts:(state,action) => {
            state.products=action.payload
        }
    }
})

export const {setProducts} = productsSlice.actions
export default productsSlice.reducer