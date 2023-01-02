import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeAll, removeItem, removeToCart, setTotals } from '../features/cart/cartSlice'
import { CartState } from '../types'

const Cart = () => {

  const dispatch = useDispatch()
  const {cart} = useSelector(store => store) as {cart:CartState}

  useEffect(()=> {
    dispatch(setTotals())
  },[cart])

    return <div>
      <div>
        <h4>cart</h4>
        <button>x</button>
      </div>

      {cart.cartProducts.map(({id,img,name,price,maxQuantity,quantity}) => {

        const limitAdd = () => {
          if(maxQuantity===quantity) return
          dispatch(addToCart({id,img,name,price,maxQuantity,quantity}))
        }

        return <div key={id}>
          <img width={225} src={img} alt={name} />
          <p>{name}</p>
          <div>
            <span>${price}</span>
            <span>x{quantity}</span>
            <span>stock: {maxQuantity}</span>
            {maxQuantity===quantity?<span>max limit</span>:null}
          </div>
          <div>
            <button onClick={limitAdd}>+</button>
            <button onClick={() => dispatch(removeToCart(id))}>-</button>
            <button onClick={() => dispatch(removeItem(id))}>remove item</button>
          </div>
        </div>
      })}
      {cart.cartProducts.length!==0?
      <>
      <div>
        <span>total</span>
        <span>${cart.totalPrice}</span>
      </div>
      <div>
        <button>check</button>
        <button onClick={()=> dispatch(removeAll())}>remove all</button>
      </div>
      </>:
      <div>
        <h5>cart is empty</h5>
      </div>  
      }
    </div>
}

export default Cart