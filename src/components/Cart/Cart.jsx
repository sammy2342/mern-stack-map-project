import { useRef } from 'react'
import './Cart.css'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping, TiDeleteOutline, AiOutlineDelete, AiFillCarryOut, AiOutlineDoubleRight } from 'react-icons/ai'
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
                                <div className='item-desc'>
                                    <div className='flex top'>
                                        <h5>{item[0].name}</h5>
                                        <h4>${item[0].price}</h4>
                                    </div>
                                    <div className='flex botton'>
                                        <div>
                                            <p className="quantity-desc">
                                                <span className='minus' onClick=''>
                                                    <AiOutlineMinus />
                                                </span>
                                                <span className='num' >
                                                    0
                                                </span>
                                                <span className='plus'onClick='' >
                                                    <AiOutlinePlus />
                                                </span>
                                            </p>
                                        </div>
                                        <button type='button' className='remove-item' onClick=''>
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {cartItems.length >= 1 && (
                        <div className='cart-bottom'>
                            <div className='total'>
                                <h3>Subtotal:</h3>
                                <h3>${totalPrice}</h3>
                            </div>
                            <div className='btn-container'>
                                <button type='button' className='btn' onClick=''>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </>: null}
            </div>
        </div>
    )
}