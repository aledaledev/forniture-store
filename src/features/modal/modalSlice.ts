import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    removeModal:false
}

const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        toggleModal:(state)=>{
            if(state.removeModal) {
                state.removeModal=false 
            } else {
                state.removeModal=true
            } 
        }
    }
})

export const {toggleModal} = modalSlice.actions
export default modalSlice.reducer