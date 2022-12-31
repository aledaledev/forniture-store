import { createSlice } from "@reduxjs/toolkit";
import { ProductProps, ProductState } from "../../types";

const initialState:ProductState = {
    products:[],
    sortedProducts:[],
    companies:[],
    categories:[],
    prices:{
        maxPrice:0,
        minPrice:0,
    }
}

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setProducts:(state,action:{type:string,payload:ProductProps[]}) => {
            state.products=action.payload
        },
        setInfo: (state) => {
            state.companies=[ 'all', ...state.products.map(({company}) => company).filter((n,i,a) => a.indexOf(n)===i?n:null)]
            state.categories=['all', ...state.products.map(({category}) => category).filter((n,i,a) => a.indexOf(n)===i?n:null)]
            const prices = state.products.map(({price})=> price);
            state.prices={maxPrice:Math.max(...prices),minPrice:Math.min(...prices)}
        },
    }
})

export const {setProducts,setInfo} = productsSlice.actions
export default productsSlice.reducer