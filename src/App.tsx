import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import ProductContainer from './components/ProductContainer';
import SortBy from './components/SortBy';
import { setProducts } from './features/products/productsSlice';
import getData from './utils/getData';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    const loadData = async () => {
      dispatch(setProducts(await getData()))
    }    
    loadData()
    
  },[])

  return (
    <div>
      <Header/>
      <SortBy/>
      <ProductContainer/>
    </div>
  )
}

export default App
