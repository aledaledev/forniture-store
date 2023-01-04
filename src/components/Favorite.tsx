import { BookmarkFillIcon, BookmarkSlashFillIcon, XIcon } from '@primer/octicons-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BtnGroup, FavBody, FavHeader, FavItem, FavoriteSc, InfoItem } from '../assets/styles/Favorite.styles'
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
        <button onClick={()=>dispatch(openFavoriteContainer(false))}><XIcon size={24} /></button>
      </FavHeader>
      <FavBody>
        {favorite.favorites.map(({img,name,id,company}) => {
          
          const inCart = cart.cartProducts.some(item => item.id ===id)
          const {price,maxQuantity} = products.products.find(item => item.id ===id) as {price:number,maxQuantity:number}
          
          return <FavItem key={id} style={{display:'flex',gap:'1rem'}}>
            <img src={img} alt={name} />
            <InfoItem>
              <p>{name}</p>
              <span>{company}</span>
            </InfoItem>
            <BtnGroup>
              <button onClick={()=>dispatch(removeFav(id))} onMouseMove={()=>setHover(id)} onMouseLeave={()=>setHover('')}>{hover===id?<BookmarkSlashFillIcon size={24} />:<BookmarkFillIcon size={24}/>}</button>
              {inCart?<button onClick={() => dispatch(removeItem(id))}>Remove from cart</button>:
              <button onClick={() => dispatch(addToCart({id,img,name,price,maxQuantity}))}>Add to cart</button>}
            </BtnGroup>
          </FavItem>
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