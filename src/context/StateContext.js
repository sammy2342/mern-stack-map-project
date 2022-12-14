import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [totalQuantites, setTotalQuantities] = useState()
    const [qty, setQty] = useState(1)

    function incQty() { 
        setQty((prevQty) => prevQty + 1)
    }

    function decQty() { 
        setQty((prevQty) => {
            if(prevQty - 1 < 1) {
                return 1
            } else { 
                return prevQty - 1
            }
        })
    }

return ( 
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantites,
                qty,
                incQty,
                decQty
            }}
            >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)