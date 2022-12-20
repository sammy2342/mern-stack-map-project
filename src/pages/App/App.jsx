import { useState } from 'react'
import { Routes, Route, } from 'react-router-dom'
import './App.css';
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage'
import NewOrderPage from '../NewOrderPage/NewOrderPage'
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'
import NavBar from '../../components/NavBar/NavBar'
import ProductDetails from '../ProductDetails/ProductDetails';
import Successs from '../Success/Success'



export default function App() {
  const [user, setUser] = useState(getUser())
  const [productsInList, setProductsInList] = useState([])
  const [productRerender, setProductRerender] = useState([])


  return (
    <main className="App">
      { user ? 
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage productsInList={productsInList} setProductsInList={setProductsInList} productRerender={productRerender} setProductRerender={setProductRerender} />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path='/product/:id' element={<ProductDetails productsInList={productsInList} setProductsInList={setProductsInList} /> } />
            <Route path='/success' element={<Successs />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}


