import Login from './pages/login'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/home'
import Cart from './pages/cart'
import { CartProvider } from './contexts/CartContext';
import WrapNavbar from './compound/wrapNavbar'
import Payment from './pages/payment'


function App() {
    return (
      <>
      <CartProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<WrapNavbar />}>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
          </Route>
          <Route path='/payment' element={<Payment />} />
        
        </Routes>
      </CartProvider>
      </>
    )
}

export default App
