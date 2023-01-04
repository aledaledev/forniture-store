import { BookmarkFillIcon, BookmarkSlashFillIcon } from '@primer/octicons-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FavBody, FavHeader, FavoriteSc } from '../assets/styles/Favorite.styles'
import { addToCart, removeItem } from '../features/cart/cartSlice'
import { openFavoriteContainer, removeFav } from '../features/favorite/favoriteSlice'
import { CartState, FavoriteState, ProductState } from '../types'

const Favorite = () => {
  const dispatch = useDispatch()
  const {favorite,cart,products} = useSelector(store => store) as {favorite:FavoriteState,cart:CartState,products:ProductState}

  const [hover, setHover] = useState('')
  
  return (
    <FavoriteSc>
      <FavHeader>
        <h5>favorites</h5>
        <button onClick={()=>dispatch(openFavoriteContainer(false))}>x</button>
      </FavHeader>
      <FavBody>
        {favorite.favorites.map(({img,name,id}) => {
          
          const inCart = cart.cartProducts.some(item => item.id ===id)
          const {price,maxQuantity} = products.products.find(item => item.id ===id) as {price:number,maxQuantity:number}
          
          return <div key={id} style={{display:'flex',gap:'1rem'}}>
            <img width={150} src={img} alt={name} />
            <p>{name}</p>
            <button onClick={()=>dispatch(removeFav(id))} onMouseMove={()=>setHover(id)} onMouseLeave={()=>setHover('')}>{hover===id?<BookmarkSlashFillIcon size={24} />:<BookmarkFillIcon size={24}/>}</button>
            {inCart?<button onClick={() => dispatch(removeItem(id))}>in cart already</button>:
            <button onClick={() => dispatch(addToCart({id,img,name,price,maxQuantity}))}>add to cart</button>}
          </div>
        })}
      {favorite.favorites.length===0?
        <div>
          <h5>No favorites yet!</h5>
        </div>
      :null}
      </FavBody>
    </FavoriteSc>
  )
}

export default Favorite