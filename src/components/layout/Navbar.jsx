import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
    const { user, profile, isAdmin, signOut } = useAuth()
    const { cartCount } = useCart()
    const navigate = useNavigate()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    async function handleSignOut() {
        await signOut()
        navigate('/')
    }

    function isActive(path) {
        return location.pathname === path
    }

    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/products' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
    ]

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">KM</span>
                    <span className="text-xl font-light text-gray-500">Stores</span>
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive(link.path)
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isAdmin && (
                        <Link
                            to="/admin"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${location.pathname.startsWith('/admin')
                                    ? 'bg-red-600 text-white'
                                    : 'text-red-600 hover:bg-red-50'
                                }`}
                        >
                            Admin
                        </Link>
                    )}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">

                    {/* Cart */}
                    <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184
                1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs
                rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Auth */}
                    {user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <Link to="/orders"
                                className="text-sm text-gray-600 hover:text-gray-900">
                                Orders
                            </Link>
                            <span className="text-sm text-gray-400 max-w-[120px] truncate">
                                {profile?.full_name || user.email}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg
                  hover:bg-gray-700 transition-colors"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link to="/login"
                                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2">
                                Login
                            </Link>
                            <Link to="/signup"
                                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg
                  hover:bg-gray-700 transition-colors">
                                Sign up
                            </Link>
                        </div>
                    )}

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                    >
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4
          flex flex-col gap-1">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMenuOpen(false)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive(link.path)
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isAdmin && (
                        <Link to="/admin" onClick={() => setMenuOpen(false)}
                            className="px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                            Admin
                        </Link>
                    )}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                        {user ? (
                            <>
                                <Link to="/orders" onClick={() => setMenuOpen(false)}
                                    className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                                    My Orders
                                </Link>
                                <button onClick={() => { handleSignOut(); setMenuOpen(false) }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-gray-600
                    hover:bg-gray-100 rounded-lg">
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)}
                                    className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                                    Login
                                </Link>
                                <Link to="/signup" onClick={() => setMenuOpen(false)}
                                    className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}