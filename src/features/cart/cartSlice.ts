import { createSlice } from "@reduxjs/toolkit";
import { Cart, CartState } from "../../types";

const initialState:CartState = {
    cartProducts:[],
    totalQuantity:0,
    totalPrice:0
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(store,action:{type:string,payload:Cart}) => {
            const inCart = store.cartProducts.some(({id}) => id === action.payload.id)
            if(inCart && action.payload.quantity){
                const updateCart = [...store.cartProducts]
                const index = updateCart.findIndex(elem => elem.id === action.payload.id)
                updateCart[index].quantity+=1
                store.cartProducts = updateCart
            } else {
                store.cartProducts = [...store.cartProducts, {...action.payload, quantity:1}]
            }
        },
        removeToCart:(store,action:{type:string,payload:string}) => {
            const {quantity} = store.cartProducts.find(({id}) => id === action.payload) as {quantity:number}
            if(quantity===1){
                store.cartProducts=store.cartProducts.filter(({id}) => id !== action.payload)
            } else {
                const updateCart = [...store.cartProducts]
                const index = updateCart.findIndex(elem => elem.id === action.payload)
                updateCart[index].quantity-=1 
                store.cartProducts = updateCart
            }
        },
        removeItem:(store,action)=>{
            store.cartProducts=store.cartProducts.filter(({id}) => id !== action.payload)
        },
        removeAll:(store) => {
            store.cartProducts=[]
        },
        setTotals:(store) => {
            if(store.cartProducts.length!==0){
                store.totalPrice= store.cartProducts.map(({price,quantity})=> price*quantity).reduce((prev,cur)=> prev+cur)
                store.totalQuantity=store.cartProducts.map(({quantity})=>quantity).reduce((prev,cur)=> prev+cur)
            }
        }
    }
})

export const {addToCart,removeToCart,removeItem,setTotals,removeAll} = cartSlice.actions
export default cartSlice.reducer