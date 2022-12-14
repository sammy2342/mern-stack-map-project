import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
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

    function onAdd(product, quantity) {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        if(checkProductInCart) { 

            const updatedCartItems = cartItems.map((cartProduct) => { 
                if(cartProduct._id === product._id) return { 
                    ...cartProduct, 
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity
            
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
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
                decQty,
                onAdd
            }}
            >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)