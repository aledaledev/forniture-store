import { createSlice } from "@reduxjs/toolkit";
import { Favorite, FavoriteState } from "../../types";

const initialState:FavoriteState = {
    favorites:[],
    openFavorite:false
}

const favoriteSlice = createSlice({
    name:'favorite',
    initialState,
    reducers:{
        addFav:(state,action:{type:string,payload:Favorite}) => {
            state.favorites = [...state.favorites ,action.payload]
        },
        removeFav:(state,action:{type:string,payload:string}) => {
            state.favorites = state.favorites.filter(elem => elem.id!==action.payload)
        },
        openFavoriteContainer:(state,action) => {
            state.openFavorite = action.payload
        }
    }
})

export const {addFav, removeFav,openFavoriteContainer} = favoriteSlice.actions
export default favoriteSlice.reducer