import { useRef } from 'react'
import './Cart.css'
import { AiOutlineMinus, AiOutLinePlus, AiOutlineLeft, AiOutlineShopping, TiDeleteOutLine, AiOutlineDelete, AiFillCarryOut, AiOutlineDoubleRight } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useStateContext } from '../../context/StateContext'
import { urlFor } from '../../libary/client'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Cart() {

    const cartRef = useRef()
    const { totalPrice, totalQuantites, cartItems, setShowCart } = useStateContext()

    useEffect( function() { 
        function getCart() { 
            console.log(cartItems)
        }
        getCart()
    }, [])


    return ( 
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
                    <AiOutlineDoubleRight />
                    <span className='heading'>Your Cart</span>
                    <span className='cart-num-items'>({totalQuantites} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={200} />
                        <h2>Your Shopping bag is empty</h2>
                        <Link to='/orders/new'>
                            <button type='button' className='btn' onClick={() => setShowCart(false)}>
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
                {cartItems ? <>
                    <div className='product-container'>
                        {cartItems.length >= 1 && cartItems.map((item, idx) => console.log(cartItems) || ( 
                            <div className='product' key={idx * 10003330}>
                                <img src={urlFor(item[0].image[0])} alt=""  className='cart-product-image'/>
                                
                            </div>
                        ))}
                    </div>
                </>: null}
            </div>
        </div>
    )
}