import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Cart from './components/Cart';
import Favorite from './components/Favorite';
import Header from './components/Header';
import ProductContainer from './components/ProductContainer';
import ProductsFilters from './components/ProductsFilters';
import { setInfo, setProducts } from './features/products/productsSlice';
import getData from './utils/getData';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    const loadData = async () => {
      dispatch(setProducts(await getData()))
      dispatch(setInfo())
    }    
    loadData()
    
  },[])

  return (
    <div>
      <Cart/>
      <Favorite/>
      <Header/>
      <ProductsFilters/>
      <ProductContainer/>
    </div>
  )
}

export default App
