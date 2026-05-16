import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'

export default function ProductCard({ product }) {
    const { addToCart } = useCart()
    const { user } = useAuth()
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)

    const inStock = product.inventory?.quantity > 0
    const isOnSale = product.compare_at_price && product.compare_at_price > product.price

    async function handleAddToCart(e) {
        e.preventDefault() // don't navigate to product page
        if (!user) return window.location.href = '/login'

        setAdding(true)
        await addToCart(product.id, 1)
        setAdding(false)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <Link to={`/products/${product.slug}`}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden
        hover:shadow-md transition-shadow duration-200 flex flex-col">

            {/* Image */}
            <div className="aspect-square bg-gray-100 overflow-hidden relative">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {isOnSale && (
                        <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                            Sale
                        </span>
                    )}
                    {!inStock && (
                        <span className="bg-gray-800 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                            Out of stock
                        </span>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-gray-400 mb-1">
                    {product.categories?.name}
                </p>
                <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">
                    {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-base font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    {isOnSale && (
                        <span className="text-sm text-gray-400 line-through">
                            ${product.compare_at_price.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* Add to cart */}
                <button
                    onClick={handleAddToCart}
                    disabled={!inStock || adding}
                    className="w-full py-2 rounded-xl text-sm font-medium transition-colors
            disabled:cursor-not-allowed
            bg-gray-900 text-white hover:bg-gray-700
            disabled:bg-gray-100 disabled:text-gray-400"
                >
                    {!inStock ? 'Out of stock' : added ? '✓ Added!' : adding ? 'Adding...' : 'Add to cart'}
                </button>
            </div>
        </Link>
    )
}