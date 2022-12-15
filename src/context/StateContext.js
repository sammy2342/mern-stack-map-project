import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantites, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)


    let foundProduct; 
    let index

    console.log(totalPrice, 'this is for total price')
    console.log(totalQuantites, 'QUANTITEISS')
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
        setTotalQuantities((prevTotalQuantities) => console.log(prevTotalQuantities, 'this is for the prevoius', quantity)|| prevTotalQuantities + quantity)
        if(checkProductInCart) { 
            
            const updatedCartItems = cartItems.map((cartProduct) => { 
                console.log(cartProduct[0]._id, 'this is for the cartProduct id', product._id, 'and this is for the product id --------')
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
    const toggleCartItemQuanitity = (id, value) => {
        
        foundProduct = cartItems.find((item) => console.log(item, 'this', id, '<--->', value) || item[0]._id === id)
        console.log(foundProduct, 'foundProduct$$$$$')
        index = cartItems.findIndex((product) => product[0]._id === id)
        // this is so it dosent add another item the same time
        const newCartItemsInCart = cartItems.filter((item) => item[0]._id !== id)

        if(value === 'inc') { 
            let newCartItems = [...newCartItemsInCart, { ...foundProduct, quantity: foundProduct.quantity + 1 }]
            setCartItems(newCartItems)
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct[0].price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
            console.log(newCartItems, 'this is new cart in items')
            // console.log(item.id, product[0]._id, 'this is forth idessss')
            console.log(foundProduct[0].price, 'this is for founDORdocrpice')
        } else if(value === 'dec') { 
            if(foundProduct.quantity > 1 ) {
                let newCartItems = [...newCartItemsInCart, { ...foundProduct, quantity: foundProduct.quantity - 1 }]
                setCartItems(newCartItems)
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct[0].price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

    const onRemove = (product) => { 
        foundProduct = cartItems.find((item) => console.log(item[0]._id ,'amd', product[0]._id)|| item[0]._id === product[0]._id)
        const newCartItem = cartItems.filter((item) => item[0]._id !== product[0]._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct[0].price * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItem)
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
                setShowCart, 
                toggleCartItemQuanitity,
                onRemove
            }}
            >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)