import React from 'react'
import { useSelector } from 'react-redux'
import { ProductWrapper } from '../assets/styles/ProductContainer.styles'
import { ProductProps } from '../types'
import ProductItem from './ProductItem'

const ProductContainer = () => {

  const {filteredProducts} = useSelector((store:any) => store.products) as {filteredProducts:ProductProps[]}

  return (
    <ProductWrapper>
      <h2>Forniture Products</h2>
      <div>
       {filteredProducts.map((product:ProductProps) => <ProductItem key={product.id} {...product} />)}
      </div>
    </ProductWrapper>
  )
}

export default ProductContainer