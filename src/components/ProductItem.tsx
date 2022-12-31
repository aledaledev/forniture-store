import React from 'react'
import { ProductProps } from '../types'

const ProductItem = ({name,category,colors,company,id,image,price,featured,shipping,maxQuantity}:ProductProps) => {
  return (
    <div key={id}>
      <ul>
        <img src={image} alt={name} style={{width:'18rem'}} />
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
      </ul>
    </div>
  )
}

export default ProductItem