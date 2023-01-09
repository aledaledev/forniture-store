import { createSlice } from "@reduxjs/toolkit";
import { FilterState, ProductProps, ProductState } from "../../types";

const initialState:ProductState = {
    selectedProduct:null,
    products:[],
    sortedProducts:[],
    filteredProducts:[],
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
            state.sortedProducts = [...state.products].sort((prev,cur) => {
              if(prev.name>cur.name) return 1
              if(prev.name<cur.name)return  -1
              return 0
            }),
            state.filteredProducts = state.sortedProducts
        },
        setInfo: (state) => {
            state.companies=[ 'all', ...state.products.map(({company}) => company).filter((n,i,a) => a.indexOf(n)===i?n:null)]
            state.categories=['all', ...state.products.map(({category}) => category).filter((n,i,a) => a.indexOf(n)===i?n:null)]
            const prices = state.products.map(({price})=> price);
            state.prices={maxPrice:Math.max(...prices),minPrice:Math.min(...prices)}
        },
        sortBy:(state,action) => {
            if(action.payload==='name'){
                state.sortedProducts= [...state.products].sort((prev,cur) => {
                  if(prev.name>cur.name) return 1
                  if(prev.name<cur.name) return -1
                  return 0
                })   
            }
            if(action.payload==='maxPrice'){
                state.sortedProducts = [...state.products].sort((prev,cur) => cur.price-prev.price)
            }
            if(action.payload==='minPrice'){
                state.sortedProducts = [...state.products].sort((prev,cur) => prev.price-cur.price)
            }
        },
        filterBy:(state,action:{type:string,payload:FilterState}) => {
            let array = state.sortedProducts
            if(action.payload.priceRange){
                array = array.filter(elem => elem.price<=action.payload.priceRange)
            }
            if(action.payload.category!=='all'){
                array = array.filter(elem => elem.category===action.payload.category)
            }
            if(action.payload.company!=='all'){
                array = array.filter(elem => elem.company===action.payload.company)
            }
            if(action.payload.featured){
                array = array.filter(elem => elem.featured===action.payload.featured)
            }
            if(action.payload.freeShipping){
                array = array.filter(elem => elem.shipping===action.payload.freeShipping)
            }
            state.filteredProducts = array
        },
        selectProduct:(state,action) => {
            state.selectedProduct=state.products.find(({id}) => id===action.payload) || null
        }
    }
})

export const {setProducts,setInfo,sortBy,filterBy,selectProduct} = productsSlice.actions
export default productsSlice.reducer