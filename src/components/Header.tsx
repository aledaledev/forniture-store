import React from 'react'
import { PackageIcon, RepoIcon } from '@primer/octicons-react';
import { useDispatch, useSelector } from 'react-redux';
import { openFavoriteContainer } from '../features/favorite/favoriteSlice';
import { openCartContainer } from '../features/cart/cartSlice';
import Cart from './Cart';
import Favorite from './Favorite';
import { CartState, FavoriteState } from '../types';
import { HeaderSc } from '../assets/styles/Header.styles';

const Header = () => {

  const dispatch = useDispatch()
  const {cart,favorite} = useSelector(store => store) as {cart:CartState, favorite:FavoriteState}

  const openFav = () => {
    dispatch(openCartContainer(false))
    dispatch(openFavoriteContainer(true))
  }

  const openCart = () => {
    dispatch(openFavoriteContainer(false))
    dispatch(openCartContainer(true))
  }

  return (
    <>
    <HeaderSc>
      <span>Fortune</span>
      <div>
        <button onClick={openFav}><RepoIcon size={24} /></button>
        <button onClick={openCart}><PackageIcon size={24} /></button>
      </div>
    </HeaderSc>
      {favorite.openFavorite?<Favorite/>:null}
      {cart.openCart?<Cart/>:null}
    </>
  )
}

export default Header