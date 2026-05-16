import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/UI/ProductCard'

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState('')

    const categorySlug = searchParams.get('category')
    const { products, categories, loading, error } = useProducts(categorySlug)

    function handleCategory(slug) {
        if (slug) setSearchParams({ category: slug })
        else setSearchParams({})
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
                <p className="text-gray-500">Browse our collection</p>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full max-w-md border border-gray-200 rounded-xl px-4 py-2.5
            text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
            </div>

            {/* Category filters */}
            <div className="flex gap-2 flex-wrap mb-8">
                <button
                    onClick={() => handleCategory(null)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${!categorySlug
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategory(cat.slug)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${categorySlug === cat.slug
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* States */}
            {loading && (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                </div>
            )}

            {error && (
                <div className="text-center py-20 text-red-500">{error}</div>
            )}

            {!loading && !error && filtered.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-lg">No products found</p>
                </div>
            )}

            {/* Grid */}
            {!loading && !error && filtered.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

        </div>
    )
}