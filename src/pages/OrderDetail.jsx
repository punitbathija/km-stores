import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'delivered']

const STATUS_STYLES = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    processing: 'bg-purple-50 text-purple-700 border-purple-200',
    shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    delivered: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
}

export default function OrderDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrder()
    }, [id])

    async function fetchOrder() {
        const { data, error } = await supabase
            .from('orders')
            .select(`*, order_items(*)`)
            .eq('id', id)
            .single()

        if (error) navigate('/orders')
        else setOrder(data)
        setLoading(false)
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
    )

    const currentStep = STATUS_STEPS.indexOf(order.status)

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">

            {/* Header */}
            <button onClick={() => navigate('/orders')}
                className="text-sm text-gray-400 hover:text-gray-700 mb-6 flex items-center gap-1">
                ← Back to orders
            </button>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                    </p>
                </div>
                <span className={`text-xs font-medium px-3 py-1.5 rounded-full border
          ${STATUS_STYLES[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
            </div>

            {/* Progress tracker */}
            {order.status !== 'cancelled' && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                    <h2 className="font-semibold text-gray-900 mb-6">Order progress</h2>
                    <div className="flex items-center">
                        {STATUS_STEPS.map((step, index) => (
                            <div key={step} className="flex items-center flex-1 last:flex-none">
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    text-xs font-medium border-2 transition-colors
                    ${index <= currentStep
                                            ? 'bg-gray-900 border-gray-900 text-white'
                                            : 'bg-white border-gray-200 text-gray-400'
                                        }`}>
                                        {index < currentStep ? '✓' : index + 1}
                                    </div>
                                    <span className="text-xs text-gray-500 mt-2 capitalize whitespace-nowrap">
                                        {step}
                                    </span>
                                </div>
                                {index < STATUS_STEPS.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-2 mb-5 transition-colors
                    ${index < currentStep ? 'bg-gray-900' : 'bg-gray-200'}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Order items */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                <h2 className="font-semibold text-gray-900 mb-4">Items</h2>
                <div className="flex flex-col divide-y divide-gray-100">
                    {order.order_items.map(item => (
                        <div key={item.id} className="flex justify-between py-3 first:pt-0 last:pb-0">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{item.product_name}</p>
                                <p className="text-xs text-gray-400">
                                    ${item.product_price.toFixed(2)} × {item.quantity}
                                </p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                                ${item.subtotal.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-100 pt-4 mt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">${order.total_amount.toFixed(2)}</span>
                </div>
            </div>

            {/* Notes */}
            {order.notes && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
                    <h2 className="font-semibold text-gray-900 mb-2">Order notes</h2>
                    <p className="text-sm text-gray-600">{order.notes}</p>
                </div>
            )}

            {/* Pickup info */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <h2 className="font-semibold text-gray-900 mb-2">Pickup information</h2>
                <p className="text-sm text-gray-600">
                    Your order will be ready for pickup in store. We'll update the order status
                    as it progresses. Thank you for your order!
                </p>
            </div>

        </div>
    )
}