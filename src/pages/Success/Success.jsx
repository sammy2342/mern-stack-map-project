import { useState, useEffect } from "react"
import { useStateContext } from '../../context/StateContext'
import { BsBagCheckFill } from 'react-icons/bs';
import { Link } from "react-router-dom";


export default function Success() { 

  const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
    useEffect( function() { 
      function resetItems() {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
      }
      resetItems()
    }, [handleClick])
}

  function handleClick(evt) { 
    evt.prevetDefalt()
  }

    // const Success = () => {
    //     const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
    //     useEffect(() => {
    //         localStorage.clear();
    //         setCartItems([]);
    //         setTotalPrice(0);
    //         setTotalQuantities(0);
    //     }, []);

    return ( 
        <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailt.com">
            sammy@gmail.com
          </a>
        </p>
        <Link to="/">
          <button type="button" width="300px" className="btn" onClick={handleClick}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
    )
}
