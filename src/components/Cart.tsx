import { TrashIcon, XIcon } from '@primer/octicons-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BtnGroup, CartBody, CartFooter, CartHeader, CartItem, CartSc, Details, ItemQuantity } from '../assets/styles/Cart.styles'
import { addToCart, openCartContainer, removeAll, removeItem, removeToCart, setTotals } from '../features/cart/cartSlice'
import { toggleModal } from '../features/modal/modalSlice'
import { CartState } from '../types'

const Cart = () => {

  const dispatch = useDispatch()
  const {cart} = useSelector(store => store) as {cart:CartState}

  useEffect(()=> {
    dispatch(setTotals())
  },[cart])

    return <CartSc>
      <CartHeader>
        <h5>cart</h5>
        <button onClick={()=>dispatch(openCartContainer(false))}><XIcon size={24} /></button>
      </CartHeader>
      <CartBody>
      {cart.cartProducts.map(({id,img,name,price,maxQuantity,quantity}) => {

        const limitAdd = () => {
          if(maxQuantity===quantity) return
          dispatch(addToCart({id,img,name,price,maxQuantity,quantity}))
        }

        return <CartItem key={id}>
          <img src={img} alt={name} />
          <Details>
            <p>{name}</p>
            <span>${price} e/u</span>
          </Details>
          <div>
            <ItemQuantity>
              <span>(stock: {maxQuantity})</span>
              {maxQuantity===quantity?<span>max limit</span>:null}
            </ItemQuantity>
            <BtnGroup>
              <button onClick={limitAdd}>+</button>
              <span>{quantity}</span>
              <button onClick={() => dispatch(removeToCart(id))}>-</button>
              <button onClick={() => dispatch(removeItem(id))}><TrashIcon size={24} /></button>
            </BtnGroup>
          </div>
        </CartItem>
      })}
      {cart.cartProducts.length===0?
      <div>
        <h5>Cart is empty!</h5>
      </div>:null}
      </CartBody>
      
      {cart.cartProducts.length!==0?
      <CartFooter>
      <div>
        <span>total</span>
        <span>${cart.totalPrice}</span>
      </div>
      <div>
        <button>check</button>
        <button onClick={()=> dispatch((toggleModal()))}>remove all</button>
      </div>
      </CartFooter>:null}
    </CartSc>
}

export default Cart