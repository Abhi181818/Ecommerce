import { createContext, useContext, useEffect } from "react"
import { useState } from "react";
const CartContext = createContext()
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) {
            setCart(cart)
        }
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};
const useCart = () => useContext(CartContext)

export { CartProvider, useCart }