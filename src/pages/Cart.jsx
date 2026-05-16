import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
    const navigate = useNavigate()
    const { cartItems, cartTotal, cartLoading, updateQuantity, removeFromCart } = useCart()

    if (cartLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
    )

    if (cartItems.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Your cart is empty</h2>
            <p className="text-gray-400 text-sm">Add some products to get started</p>
            <button
                onClick={() => navigate('/products')}
                className="mt-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm
          font-medium hover:bg-gray-700"
            >
                Browse products
            </button>
        </div>
    )

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Cart items */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {cartItems.map(item => (
                        <div key={item.id}
                            className="flex gap-4 bg-white border border-gray-200 rounded-2xl p-4">

                            {/* Image */}
                            <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                {item.products.image_url ? (
                                    <img
                                        src={item.products.image_url}
                                        alt={item.products.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 truncate">
                                    {item.products.name}
                                </h3>
                                <p className="text-sm text-gray-400 mb-3">
                                    ${item.products.price.toFixed(2)} each
                                </p>

                                {/* Quantity + remove */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm"
                                        >
                                            −
                                        </button>
                                        <span className="px-3 py-1 text-sm border-x border-gray-200">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold text-gray-900">
                                            ${(item.products.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-300 hover:text-red-400 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order summary */}
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

                    <div className="border-t border-gray-100 pt-4 mb-6">
                        <div className="flex justify-between font-semibold text-gray-900">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Pickup order — no delivery fee</p>
                    </div>

                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm
              font-medium hover:bg-gray-700 transition-colors"
                    >
                        Proceed to checkout
                    </button>

                    <button
                        onClick={() => navigate('/products')}
                        className="w-full mt-3 py-3 rounded-xl text-sm font-medium
              border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        Continue shopping
                    </button>
                </div>

            </div>
        </div>
    )
}