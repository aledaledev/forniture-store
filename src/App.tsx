import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Modal from './components/Modal';
import ProductContainer from './components/ProductContainer';
import ProductsFilters from './components/ProductsFilters';
import { setInfo, setProducts } from './features/products/productsSlice';
import getData from './utils/getData';

function App() {

  const dispatch = useDispatch()
  const store = useSelector(store => store.modal)

  useEffect(() => {

    const loadData = async () => {
      dispatch(setProducts(await getData()))
      dispatch(setInfo())
    }    
    loadData()
    
  },[])

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement
    
    if(store.removeModal) {
      body.style.overflow='hidden'
    } else {
      body.style.overflow='visible'
    }

  },[store.removeModal])

  return (
    <div>
      {store.removeModal?<Modal/>:null}
      <Header/>
      <ProductsFilters/>
      <ProductContainer/>
    </div>
  )
}

export default App
