import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Checkout() {
    const navigate = useNavigate()
    const { user, profile } = useAuth()
    const { cartItems, cartTotal, clearCart } = useCart()

    const [notes, setNotes] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Redirect if cart is empty
    if (cartItems.length === 0) {
        navigate('/cart')
        return null
    }

    async function handlePlaceOrder() {
        setLoading(true)
        setError('')

        try {
            // 1 — Create the order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    status: 'pending',
                    order_type: 'takeaway',
                    total_amount: cartTotal,
                    notes: notes.trim() || null
                })
                .select()
                .single()

            if (orderError) throw orderError

            // 2 — Insert all order items
            const orderItems = cartItems.map(item => ({
                order_id: order.id,
                product_id: item.product_id,
                product_name: item.products.name,
                product_price: item.products.price,
                quantity: item.quantity,
                subtotal: item.products.price * item.quantity
            }))

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems)

            if (itemsError) throw itemsError

            // 3 — Decrement inventory for each product
            for (const item of cartItems) {
                await supabase.rpc('decrement_inventory', {
                    p_product_id: item.product_id,
                    p_quantity: item.quantity
                })
            }

            // 4 — Clear the cart
            await clearCart()

            // 5 — Go to order confirmation
            navigate(`/orders/${order.id}`)

        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-500 mb-8">Review your order before placing it</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left — details */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Customer info */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <h2 className="font-semibold text-gray-900 mb-4">Your details</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Name</span>
                                <span className="text-gray-900 font-medium">
                                    {profile?.full_name || '—'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Email</span>
                                <span className="text-gray-900 font-medium">{user.email}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Order type</span>
                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                                    Takeaway — pickup in store
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order items */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <h2 className="font-semibold text-gray-900 mb-4">Order items</h2>
                        <div className="flex flex-col divide-y divide-gray-100">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {item.products.image_url ? (
                                            <img src={item.products.image_url} alt={item.products.name}
                                                className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {item.products.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            ${item.products.price.toFixed(2)} × {item.quantity}
                                        </p>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900">
                                        ${(item.products.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <h2 className="font-semibold text-gray-900 mb-1">Order notes</h2>
                        <p className="text-xs text-gray-400 mb-3">
                            Any special requests or instructions?
                        </p>
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            rows={3}
                            placeholder="e.g. Gift wrap please, leave at front desk..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                        />
                    </div>

                </div>

                {/* Right — summary */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-fit sticky top-24">
                    <h2 className="font-semibold text-gray-900 mb-4">Order summary</h2>

                    <div className="space-y-2 mb-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between text-sm text-gray-600">
                                <span className="truncate mr-2">
                                    {item.products.name} × {item.quantity}
                                </span>
                                <span className="flex-shrink-0">
                                    ${(item.products.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4 mb-2">
                        <div className="flex justify-between font-bold text-gray-900 text-lg">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Pickup in store — no delivery fee</p>
                    </div>

                    {error && (
                        <div className="my-3 p-3 bg-red-50 border border-red-200 rounded-lg
              text-xs text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="w-full mt-4 bg-gray-900 text-white py-3.5 rounded-xl text-sm
              font-medium hover:bg-gray-700 disabled:opacity-50
              disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Placing order...' : `Place order — $${cartTotal.toFixed(2)}`}
                    </button>

                    <button
                        onClick={() => navigate('/cart')}
                        className="w-full mt-3 py-3 rounded-xl text-sm font-medium
              border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        ← Back to cart
                    </button>
                </div>

            </div>
        </div>
    )
}