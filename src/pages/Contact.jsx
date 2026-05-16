import { useState } from 'react'

const TESTIMONIALS = [
    {
        name: 'Rahul M.',
        rating: 5,
        text: 'Best store in the area! Always fresh stock and great prices. Been coming here for years.',
    },
    {
        name: 'Priya S.',
        rating: 5,
        text: 'Love the imported chocolates section. The staff is always so helpful and friendly.',
    },
    {
        name: 'Amir K.',
        rating: 4,
        text: 'Convenient pickup orders, super fast. Great selection of snacks and cold drinks.',
    },
]

function StarDisplay({ rating }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
                    viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
            00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0
            00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1
            1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
            1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0
            00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    )
}

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        // You can wire this to an email service later (e.g. Resend, EmailJS)
        setSubmitted(true)
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">

            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact us</h1>
                <p className="text-gray-500 text-lg">We'd love to hear from you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">

                {/* Store info */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold text-gray-900">Get in touch</h2>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center
              justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827
                  0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 mb-1">Store address</p>
                            <p className="text-sm text-gray-500">123 Main Street, Mumbai</p>
                            <p className="text-sm text-gray-500">Maharashtra, India — 400001</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center
              justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1
                  0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516
                  5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0
                  01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 mb-1">Contact number</p>
                            <p className="text-sm text-gray-500">+91 98765 43210</p>
                            <p className="text-sm text-gray-500">Mon–Sat, 9am – 9pm</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center
              justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0
                  002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 mb-1">Email</p>
                            <p className="text-sm text-gray-500">hello@kmstores.in</p>
                        </div>
                    </div>
                </div>

                {/* Contact form */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center
                justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900">Message sent!</h3>
                            <p className="text-sm text-gray-500 text-center">
                                We'll get back to you within 24 hours.
                            </p>
                            <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                                className="text-sm text-gray-500 underline mt-2">
                                Send another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <h2 className="font-semibold text-gray-900 mb-2">Send a message</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text" required
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email" required
                                    value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    required rows={4}
                                    value={form.message}
                                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <button type="submit"
                                className="w-full bg-gray-900 text-white py-2.5 rounded-xl text-sm
                  font-medium hover:bg-gray-700 transition-colors">
                                Send message
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Testimonials */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What our customers say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TESTIMONIALS.map(t => (
                        <div key={t.name}
                            className="bg-white border border-gray-200 rounded-2xl p-6">
                            <StarDisplay rating={t.rating} />
                            <p className="text-sm text-gray-600 mt-3 mb-4 leading-relaxed">
                                "{t.text}"
                            </p>
                            <p className="text-sm font-medium text-gray-900">{t.name}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}