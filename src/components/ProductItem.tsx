import React, { useState } from 'react'
import { BookmarkFillIcon, BookmarkIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'
import { addFav, removeFav } from '../features/favorite/favoriteSlice'
import { CartState, FavoriteState, ProductProps } from '../types'
import { addToCart, openCartContainer, removeItem, removeToCart } from '../features/cart/cartSlice'
import { Badges, Colors, Product, ProductInfo } from '../assets/styles/ProductItem.styles'
import { Link } from 'react-router-dom'

const ProductItem = ({name,category,colors,company,id,image:img,price,featured,shipping,maxQuantity}:ProductProps) => {

  const [onProduct, setOnProduct] = useState(false)

  const dispatch = useDispatch()
  const {favorite,cart} = useSelector(store => store) as {favorite:FavoriteState,cart:CartState}
  const isFavorite = favorite.favorites.some((item) => item.id===id)

  const toggleFavorite = () => {
    if(isFavorite) {
      dispatch(removeFav(id))
    } else {
      dispatch(addFav({img,name,id,company}))
    }
  }

  const inCart = cart.cartProducts.some(item => item.id ===id)

  return (
    <Product onMouseEnter={() => setOnProduct(true)} onMouseLeave={() => setOnProduct(false)} key={id}>
        {onProduct?<button onClick={toggleFavorite}>{isFavorite?<BookmarkFillIcon size={24}/>:<BookmarkIcon size={24}/>}</button>:null}
        
        <img src={img} alt={name} />
        
        <div>
        <ProductInfo>
          <Link to={`/product/${id}`} onClick={()=>dispatch(openCartContainer(false))}><p>{name}</p></Link>
          <span>$ {price}</span>
        </ProductInfo>
        
        <Badges>
          <span>{company}</span>
          <span>{category}</span>
          {featured?<span>featured</span>:null}
          {shipping?<span>free shipping</span>:null}
          {maxQuantity<4?<span>last {maxQuantity} units!</span>:null}
        </Badges>

        <Colors>
          <p>colors:</p>
          {colors.map(color => {
          return <span key={color} style={{background:color}}></span>
          })}
        </Colors>
        
        {inCart?<button onClick={() => dispatch(removeItem(id))}>remove from cart</button>:<button onClick={() => dispatch(addToCart({id,img,name,price,maxQuantity}))}>add to cart</button>}
        </div>
    </Product>
  )
}

export default ProductItem