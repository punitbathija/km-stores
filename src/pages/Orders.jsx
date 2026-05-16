import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const STATUS_STYLES = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    processing: 'bg-purple-50 text-purple-700 border-purple-200',
    shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    delivered: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
}

export default function Orders() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    async function fetchOrders() {
        const { data } = await supabase
            .from('orders')
            .select(`*, order_items(*)`)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        setOrders(data || [])
        setLoading(false)
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
    )

    if (orders.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <h2 className="text-xl font-semibold text-gray-700">No orders yet</h2>
            <p className="text-gray-400 text-sm">Your orders will appear here once you place one</p>
            <button
                onClick={() => navigate('/products')}
                className="mt-2 bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-700"
            >
                Start shopping
            </button>
        </div>
    )

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your orders</h1>

            <div className="flex flex-col gap-4">
                {orders.map(order => (
                    <div
                        key={order.id}
                        onClick={() => navigate(`/orders/${order.id}`)}
                        className="bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer
              hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">
                                    Order #{order.id.slice(0, 8).toUpperCase()}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </p>
                            </div>
                            <span className={`text-xs font-medium px-3 py-1 rounded-full border
                ${STATUS_STYLES[order.status]}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                {order.order_items.length} item{order.order_items.length !== 1 ? 's' : ''}
                            </p>
                            <p className="font-bold text-gray-900">
                                ${order.total_amount.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}