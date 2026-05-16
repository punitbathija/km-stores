import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function ProductDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { addToCart } = useCart()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        fetchProduct()
    }, [slug])

    async function fetchProduct() {
        setLoading(true)
        const { data, error } = await supabase
            .from('products')
            .select(`
        *,
        categories(name, slug),
        inventory(quantity)
      `)
            .eq('slug', slug)
            .eq('is_active', true)
            .single()

        if (error) setError(error.message)
        else setProduct(data)
        setLoading(false)
    }

    async function handleAddToCart() {
        if (!user) return navigate('/login')
        setAdding(true)
        await addToCart(product.id, quantity)
        setAdding(false)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const inStock = product?.inventory?.quantity > 0
    const isOnSale = product?.compare_at_price && product.compare_at_price > product.price
    const maxQty = Math.min(product?.inventory?.quantity ?? 0, 10)

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
    )

    if (error || !product) return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <p className="text-gray-500">Product not found</p>
            <button onClick={() => navigate('/products')}
                className="text-sm underline text-gray-700">
                Back to products
            </button>
        </div>
    )

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <button onClick={() => navigate('/')} className="hover:text-gray-700">Home</button>
                <span>/</span>
                <button onClick={() => navigate('/products')} className="hover:text-gray-700">Products</button>
                <span>/</span>
                <span className="text-gray-700">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Image */}
                <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col">

                    {/* Category */}
                    <p className="text-sm text-gray-400 mb-2">{product.categories?.name}</p>

                    {/* Name */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                        </span>
                        {isOnSale && (
                            <>
                                <span className="text-lg text-gray-400 line-through">
                                    ${product.compare_at_price.toFixed(2)}
                                </span>
                                <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                                    Save ${(product.compare_at_price - product.price).toFixed(2)}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                    {/* Stock status */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className={`h-2 w-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-400'}`} />
                        <span className="text-sm text-gray-600">
                            {inStock
                                ? `In stock (${product.inventory.quantity} available)`
                                : 'Out of stock'}
                        </span>
                    </div>

                    {/* Quantity selector */}
                    {inStock && (
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-sm font-medium text-gray-700">Quantity</span>
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    −
                                </button>
                                <span className="px-4 py-2 text-sm font-medium border-x border-gray-200 min-w-[3rem] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(q => Math.min(maxQty, q + 1))}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Add to cart */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!inStock || adding}
                        className="w-full py-3.5 rounded-xl font-medium text-sm transition-colors
              bg-gray-900 text-white hover:bg-gray-700
              disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                        {!inStock
                            ? 'Out of stock'
                            : added
                                ? '✓ Added to cart!'
                                : adding
                                    ? 'Adding...'
                                    : `Add to cart — $${(product.price * quantity).toFixed(2)}`}
                    </button>

                    {/* Go to cart shortcut */}
                    {added && (
                        <button
                            onClick={() => navigate('/cart')}
                            className="mt-3 w-full py-3 rounded-xl font-medium text-sm border
                border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            View cart →
                        </button>
                    )}

                </div>
            </div>
        </div>
    )
}