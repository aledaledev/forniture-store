import React from 'react'
import { BookmarkFillIcon, BookmarkIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import { addFav, removeFav } from '../features/favorite/favoriteSlice'
import { CartState, FavoriteState, ProductProps } from '../types'
import { addToCart, removeToCart } from '../features/cart/cartSlice'

const ProductItem = ({name,category,colors,company,id,image:img,price,featured,shipping,maxQuantity}:ProductProps) => {

  const dispatch = useDispatch()
  const {favorite,cart} = useSelector(store => store) as {favorite:FavoriteState,cart:CartState}
  const isFavorite = favorite.favorites.some((item) => item.id===id)

  const toggleFavorite = () => {
    if(isFavorite) {
      dispatch(removeFav(id))
    } else {
      dispatch(addFav({img,name,id}))
    }
  }

  const inCart = cart.cartProducts.some(item => item.id ===id)

  return (
    <div key={id}>
      <ul>
        <button onClick={toggleFavorite}>{isFavorite?<BookmarkFillIcon size={24}/>:<BookmarkIcon size={24}/>}</button>
        <img src={img} alt={name} style={{width:'18rem'}} />
        <li>{name}</li>
        <li>{category}</li>
        <li>{company}</li>
        <li>{price}</li>
        <li>{featured?'featured':'common'}</li>
        <li>{shipping?'free shipping':'no free shipping'}</li>
        
        <br/>
        
        <li>{colors.map(color => {
          return <div key={color} style={{background:color}}>{color}</div>
        })}</li>
        <li>{maxQuantity}</li>
        {inCart?<button onClick={() => dispatch(removeToCart(id))}>remove cart</button>:<button onClick={() => dispatch(addToCart({id,img,name,price,maxQuantity}))}>add to cart</button>}
      </ul>
    </div>
  )
}

export default ProductItem