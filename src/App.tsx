import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Modal from './components/Modal';
import Product from './components/Product';
import ProductContainer from './components/ProductContainer';
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

  //por alguna extraña razo el modal no puede estar aca

  return (
    <div>
      <Header/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/products' element={<ProductContainer/>}/>
        <Route path='/product/:productId' element={<Product/>} />
      </Routes>
    </div>
  )
}

export default App
