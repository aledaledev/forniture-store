import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'

const ProductContainer = () => {

  const {products} = useSelector(store => store.products) 

  return (
    <div>
      <h2>forniture Products</h2>
      <div>
        {products.map(product => <ProductItem key={product.key} {...product} />)}
      </div>
    </div>
  )
}

export default ProductContainer