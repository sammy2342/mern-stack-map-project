import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import './NavBar.css'
import Cart from '../Cart/Cart'
import { useStateContext } from '../../context/StateContext'
import { AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai'

export default function NavBar({ user, setUser }) {

    const { showCart, setShowCart, totalQuantites } = useStateContext()

    // console.log(totalQuantites, 'this is for toal')

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        
        <nav className='nav-bar'>
            <div className='Logo'><h2>Logo</h2></div>
            {/* <Link to="/orders" className='navbar-links-text'>Order History</Link> */}
            &nbsp; | &nbsp;
            <Link to="/" className='navbar-links-text'>Products</Link>
            &nbsp; | &nbsp;
            <div className='navbar-links-text-1'>Welcome, {user.name}</div>
            <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
                <AiOutlineShoppingCart /> 
                <span className='cart-item-qty'>{totalQuantites}</span>
            </button>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut} className='navbar-links-text'>Log Out</Link>
            {/* <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
                <AiOutlineShoppingCart /> 
                <span className='cart-item-qty'>{totalQuantites}</span>
            </button> */}
            {showCart && <Cart />}
        </nav>
    )
}