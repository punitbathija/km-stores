import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ adminOnly = false }) {
    const { user, profile, loading } = useAuth()

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
    )

    if (!user) return <Navigate to="/login" replace />
    if (adminOnly && profile?.role !== 'admin') return <Navigate to="/" replace />

    return <Outlet />
}