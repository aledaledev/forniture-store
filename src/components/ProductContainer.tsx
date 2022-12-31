import React from 'react'
import { useSelector } from 'react-redux'
import { ProductProps } from '../types'
import ProductItem from './ProductItem'

const ProductContainer = () => {

  const {products} = useSelector((store:any) => store.products) as ProductProps[]

  return (
    <div>
      <h2>Forniture Products</h2>
      <div>
        {products.map((product:ProductProps) => <ProductItem key={product.id} {...product} />)}
      </div>
    </div>
  )
}

export default ProductContainer