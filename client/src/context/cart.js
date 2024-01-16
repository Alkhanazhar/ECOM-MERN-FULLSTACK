import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        const existing =localStorage.getItem("cart")
        if (existing)setCart(JSON.parse(existing))
        
},[])

    return (<CartContext.Provider value={[cart, setCart]}>
        {children}
    </CartContext.Provider>
    )
}
const useCart = () => useContext(CartContext)

export { useCart, CartContextProvider }