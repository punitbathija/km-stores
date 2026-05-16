import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useProducts(categorySlug = null) {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [categorySlug])

    async function fetchCategories() {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name')
        if (!error) setCategories(data)
    }

    async function fetchProducts() {
        setLoading(true)
        setError(null)

        let query = supabase
            .from('products')
            .select(`
        *,
        categories(name, slug),
        inventory(quantity)
      `)
            .eq('is_active', true)
            .order('created_at', { ascending: false })

        // filter by category if one is selected
        if (categorySlug) {
            query = query.eq('categories.slug', categorySlug)
        }

        const { data, error } = await query

        if (error) setError(error.message)
        else setProducts(data)

        setLoading(false)
    }

    return { products, categories, loading, error, refetch: fetchProducts }
}