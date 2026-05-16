import Navbar from './components/layout/Navbar'
import Router from './routes/Router'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Router />
    </div>
  )
}