import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/UI/ProductCard'

const SLIDES = [
    {
        id: 1,
        title: 'Imported Chocolates',
        subtitle: 'Handpicked from around the world',
        tag: 'New arrivals',
        bg: 'from-amber-900 to-amber-700',
        accent: 'bg-amber-500',
    },
    {
        id: 2,
        title: 'Snacks & Cold Drinks',
        subtitle: 'Everything you crave, ready for pickup',
        tag: 'Most popular',
        bg: 'from-blue-900 to-blue-700',
        accent: 'bg-blue-500',
    },
    {
        id: 3,
        title: 'Fresh Stock Daily',
        subtitle: 'Quality products at honest prices since 1945',
        tag: 'KM Stores',
        bg: 'from-gray-900 to-gray-700',
        accent: 'bg-white',
    },
]

function HeroSlider() {
    const [current, setCurrent] = useState(0)
    const navigate = useNavigate()

    const next = useCallback(() => {
        setCurrent(c => (c + 1) % SLIDES.length)
    }, [])

    const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)

    // Auto advance
    useEffect(() => {
        const timer = setInterval(next, 5000)
        return () => clearInterval(timer)
    }, [next])

    return (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
            {SLIDES.map((slide, index) => {
                const isActive = index === current;
                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full bg-gradient-to-br ${slide.bg} transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <div className="max-w-6xl mx-auto px-4 h-full flex flex-col justify-center">
                            <div className={`max-w-xl transition-all duration-1000 delay-100 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                {/* Tag */}
                                <span className={`inline-block ${slide.accent} text-gray-900 text-xs font-bold
                                    px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider shadow-sm`}>
                                    {slide.tag}
                                </span>

                                {/* Title */}
                                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
                                    {slide.title}
                                </h1>

                                {/* Subtitle */}
                                <p className="text-gray-200 text-lg md:text-xl mb-10 font-medium drop-shadow">
                                    {slide.subtitle}
                                </p>

                                {/* CTA */}
                                <div className="flex items-center gap-5">
                                    <button
                                        onClick={() => navigate('/products')}
                                        className="bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold
                                        text-sm hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
                                    >
                                        Shop now
                                    </button>
                                    <Link to="/about"
                                        className="text-white text-sm font-semibold hover:text-gray-200 hover:underline flex items-center gap-2">
                                        Learn about us <span>&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
                <div className="flex gap-3 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 rounded-full transition-all duration-500
                                ${i === current ? 'w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Prev / Next arrows */}
            {/* <button
                onClick={prev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-md
                hover:bg-black/40 hover:scale-110 rounded-full flex items-center justify-center
                text-white transition-all z-20 border border-white/10 opacity-50"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={next}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 backdrop-blur-md
                hover:bg-black/40 hover:scale-110 rounded-full flex items-center justify-center
                text-white transition-all z-20 border border-white/10 opacity-50"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                        d="M9 5l7 7-7 7" />
                </svg>
            </button> */}
        </div>
    )
}

function CategoryGrid() {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        supabase
            .from('categories')
            .select('*')
            .order('name')
            .then(({ data }) => setCategories(data || []))
    }, [])

    if (categories.length === 0) return null

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Shop by category</h2>
                <Link to="/products" className="text-sm text-gray-500 hover:text-gray-900">
                    View all →
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => navigate(`/products?category=${cat.slug}`)}
                        className="group bg-white border border-gray-200 rounded-2xl p-6
              hover:border-gray-900 hover:shadow-md transition-all text-left"
                    >
                        {/* Icon placeholder */}
                        <div className="w-10 h-10 bg-gray-100 rounded-xl mb-3 flex items-center
              justify-center group-hover:bg-gray-900 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0
                  002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <p className="font-medium text-gray-900 text-sm">{cat.name}</p>
                        {cat.description && (
                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{cat.description}</p>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

function MostLovedProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('products')
            .select(`*, categories(name, slug), inventory(quantity)`)
            .eq('is_active', true)
            .eq('is_featured', true)
            .order('created_at', { ascending: false })
            .then(({ data }) => {
                setProducts(data || [])
                setLoading(false)
            })
    }, [])

    if (!loading && products.length === 0) return null

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Most ❤️ products
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        Customer favourites, handpicked for you
                    </p>
                </div>
                <Link to="/products" className="text-sm text-gray-500 hover:text-gray-900">
                    View all →
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

function StoreHighlights() {
    const highlights = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0
            014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42
            3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806
            1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42
            3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0
            01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438
            3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            title: 'Quality guaranteed',
            desc: 'Every product is hand-selected for quality and freshness.',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Quick pickup',
            desc: 'Order online, pick up in store — no waiting around.',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7
            20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0
            0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Family owned',
            desc: 'Three generations of trust, serving our community since 1945.',
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293
            2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0
            000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            title: '500+ products',
            desc: 'Huge range of snacks, drinks, chocolates and more.',
        },
    ]

    return (
        <div className="bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {highlights.map(h => (
                        <div key={h.title} className="flex flex-col gap-3">
                            <div className="text-gray-400">{h.icon}</div>
                            <p className="font-semibold text-white">{h.title}</p>
                            <p className="text-sm text-gray-400 leading-relaxed">{h.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <div>
            <HeroSlider />
            <CategoryGrid />
            <MostLovedProducts />
            <StoreHighlights />
        </div>
    )
}