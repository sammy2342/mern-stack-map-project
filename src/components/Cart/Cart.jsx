import { useRef } from 'react'
import './Cart.css'
import { AiOutlineMinus, AiOutLinePlus, AiOutlineLeft, AiOutLineShopping, TiDeleteOutLine, AiOutlineDelete, AiFillCarryOut, AiOutlineDoubleRight } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useStateContext } from '../../context/StateContext'
import { urlFor } from '../../libary/client'

export default function Cart() {

    const cartRef = useRef()
    const { totalPrice, totalQuantites, cartItems, setShowCart } = useStateContext()

    return ( 
        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
                    <AiOutlineDoubleRight />
                    <span className='heading'>Your Cart</span>
                    <span className='cart-num-items'>({totalQuantites} items)</span>
                </button>
            </div>
        </div>
    )
}