import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantites, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)


    console.log(totalPrice, 'this is for total price')
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
        console.log(product[0].name, quantity, 'stateconext page')
        const checkProductInCart = cartItems.find((item) => console.log(item, 'this is the item') || item._id === product[0]._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product[0].price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        if(checkProductInCart) { 
            
            const updatedCartItems = cartItems.map((cartProduct) => { 
                console.log(cartProduct[0]._id, 'this is for the cartProduct id', product[0]._id, 'and this is for the product id')
                console.log(cartProduct.quantity, quantity,'this is for the cart product line 37 state context')
                console.log('stateContext line 38 this is for the product', product)
                if(cartProduct[0]._id == product[0]._id) return { 
                    ...cartProduct, 
                    quantity: cartProduct.quantity + quantity
                }
            })
            console.log(updatedCartItems, 'this is for the updated cart')
            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity
            console.log(product.quantity, cartItems, product, 'this is in stateconext line 46')
            setCartItems([...cartItems, { ...product }])
        }
        // console.log(product)
        toast.success(`${qty} ${product[0].name} added to the cart.`)
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
                onAdd, 
                setShowCart
            }}
            >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)