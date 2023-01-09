import React, { useEffect } from 'react'
import { PackageIcon, RepoIcon } from '@primer/octicons-react';
import { useDispatch, useSelector } from 'react-redux';
import { openFavoriteContainer } from '../features/favorite/favoriteSlice';
import { openCartContainer } from '../features/cart/cartSlice';
import Cart from './Cart';
import Favorite from './Favorite';
import { CartState, FavoriteState, ProductState } from '../types';
import { HeaderSc } from '../assets/styles/Header.styles';
import { NavLink, useLocation } from 'react-router-dom';
import Modal from './Modal';
import { setPriceRange } from '../features/formProduct/formProductSlice';

const Header = () => {

  const dispatch = useDispatch()
  const {cart,favorite,products} = useSelector(store => store) as {cart:CartState, favorite:FavoriteState,products:ProductState}
  const {removeModal} = useSelector((store:any) => store.modal) as {removeModal:boolean}

  const currentLocation = useLocation()

  const openFav = () => {
    dispatch(openCartContainer(false))
    dispatch(openFavoriteContainer(true))
  }

  const openCart = () => {
    dispatch(openFavoriteContainer(false))
    dispatch(openCartContainer(true))
  }

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement
    
    if(removeModal) {
      body.style.overflow='hidden'
    } else {
      body.style.overflow='visible'
    }

  },[removeModal])

  useEffect(() => {
    
    if(products.products.length>0){
      const maxPrice = products.products.map(({price}) => price).reduce((prev,cur) => prev>cur?prev:cur)
      dispatch(setPriceRange(maxPrice))
    }

  },[products])

  return (
    <>
    <HeaderSc>
      <span>Fortune</span>
      {currentLocation.pathname === '/products'?
      <div>
        <button onClick={openFav}><RepoIcon size={24} /></button>
        <button onClick={openCart}><PackageIcon size={24} /></button>
      </div>:null}
      {currentLocation.pathname.includes('/product/')?
      <NavLink to='/products'>Go back Products</NavLink>
      :null}
    </HeaderSc>
      {favorite.openFavorite?<Favorite/>:null}
      {cart.openCart?<Cart/>:null}
      {removeModal?<Modal/>:null}
    </>
  )
}

export default Header