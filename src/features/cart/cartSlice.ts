import { createSlice } from "@reduxjs/toolkit";
import { Cart, CartState } from "../../types";

const initialState:CartState = {
    cartProducts:[],
    totalQuantity:0,
    totalPrice:0,
    openCart:false
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action:{type:string,payload:Cart}) => {
            const inCart = state.cartProducts.some(({id}) => id === action.payload.id)
            if(inCart && action.payload.quantity){
                const updateCart = [...state.cartProducts]
                const index = updateCart.findIndex(elem => elem.id === action.payload.id)
                updateCart[index].quantity+=1
                state.cartProducts = updateCart
            } else {
                state.cartProducts = [...state.cartProducts, {...action.payload, quantity:1}]
            }
        },
        removeToCart:(state,action:{type:string,payload:string}) => {
            const {quantity} = state.cartProducts.find(({id}) => id === action.payload) as {quantity:number}
            if(quantity===1){
                state.cartProducts=state.cartProducts.filter(({id}) => id !== action.payload)
            } else {
                const updateCart = [...state.cartProducts]
                const index = updateCart.findIndex(elem => elem.id === action.payload)
                updateCart[index].quantity-=1 
                state.cartProducts = updateCart
            }
        },
        removeItem:(state,action)=>{
            state.cartProducts=state.cartProducts.filter(({id}) => id !== action.payload)
        },
        removeAll:(state) => {
            state.cartProducts=[]
        },
        setTotals:(state) => {
            if(state.cartProducts.length!==0){
                state.totalPrice= state.cartProducts.map(({price,quantity})=> price*quantity).reduce((prev,cur)=> prev+cur)
                state.totalQuantity=state.cartProducts.map(({quantity})=>quantity).reduce((prev,cur)=> prev+cur)
            }
        },
        openCartContainer:(state,action)=>{
            state.openCart=action.payload
        }
    }
})

export const {addToCart,removeToCart,removeItem,setTotals,removeAll,openCartContainer} = cartSlice.actions
export default cartSlice.reducer