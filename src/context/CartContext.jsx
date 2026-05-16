import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const CartContext = createContext({})

export function CartProvider({ children }) {
    const { user } = useAuth()
    const [cartItems, setCartItems] = useState([])
    const [cartLoading, setCartLoading] = useState(false)

    useEffect(() => {
        if (user) fetchCart()
        else setCartItems([])
    }, [user])

    async function fetchCart() {
        setCartLoading(true)
        const { data } = await supabase
            .from('cart_items')
            .select('*, products(*)')
            .eq('user_id', user.id)
        setCartItems(data || [])
        setCartLoading(false)
    }

    async function addToCart(productId, quantity = 1) {
        if (!user) return { error: 'Please log in to add items to cart' }

        const { error } = await supabase
            .from('cart_items')
            .upsert(
                { user_id: user.id, product_id: productId, quantity },
                { onConflict: 'user_id,product_id', ignoreDuplicates: false }
            )

        if (!error) fetchCart()
        return { error }
    }

    async function updateQuantity(cartItemId, quantity) {
        if (quantity < 1) return removeFromCart(cartItemId)

        const { error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', cartItemId)

        if (!error) fetchCart()
    }

    async function removeFromCart(cartItemId) {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', cartItemId)

        if (!error) fetchCart()
    }

    async function clearCart() {
        await supabase
            .from('cart_items')
            .delete()
            .eq('user_id', user.id)
        setCartItems([])
    }

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.products.price, 0
    )

    return (
        <CartContext.Provider value={{
            cartItems, cartLoading, cartCount, cartTotal,
            addToCart, updateQuantity, removeFromCart, clearCart, fetchCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)