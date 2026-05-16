export default function About() {
    const locations = [
        { name: 'KM Stores — Main Branch', address: '123 Main Street, Mumbai', phone: '+91 98765 43210' },
        { name: 'KM Stores — West Branch', address: '45 West Avenue, Mumbai', phone: '+91 98765 43211' },
    ]

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">

            {/* Hero */}
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">About KM Stores</h1>
                <p className="text-gray-500 text-lg max-w-xl mx-auto">
                    Serving our community with quality products since 1945.
                </p>
            </div>

            {/* Store images placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i}
                        className="aspect-square bg-gray-100 rounded-2xl flex items-center
              justify-center text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 
                012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 
                00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                ))}
            </div>

            {/* Story */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16
        items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our story</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        KM Stores was founded in 1945 with a simple mission — bring quality
                        products to our neighbourhood at honest prices. What started as a small
                        corner shop has grown into a beloved local institution.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Over the decades we've expanded our range to include imported chocolates,
                        snacks, cold drinks, and much more — always hand-picked for quality.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Today, three generations later, we remain family-owned and committed
                        to the same values that started it all.
                    </p>
                </div>
                <div className="bg-gray-900 rounded-2xl p-8 text-white">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-4xl font-bold mb-1">80+</p>
                            <p className="text-gray-400 text-sm">Years in business</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-1">2</p>
                            <p className="text-gray-400 text-sm">Store locations</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-1">500+</p>
                            <p className="text-gray-400 text-sm">Products stocked</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold mb-1">3</p>
                            <p className="text-gray-400 text-sm">Generations of family</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Locations */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our locations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {locations.map(loc => (
                        <div key={loc.name}
                            className="bg-white border border-gray-200 rounded-2xl p-6">
                            <div className="w-full aspect-video bg-gray-100 rounded-xl mb-4
                flex items-center justify-center text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 
                    012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 
                    00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{loc.name}</h3>
                            <p className="text-sm text-gray-500 mb-1">{loc.address}</p>
                            <p className="text-sm text-gray-500">{loc.phone}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}