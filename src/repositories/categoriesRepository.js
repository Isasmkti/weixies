import { supabase } from '../lib/supabase'

export async function rAll() {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true })

        if (error) throw error
        return data
    } catch (err) {
        console.error('rAll categories error:', err)
        throw err
    }
}

export async function rGetById(id) {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    } catch (err) {
        console.error('rGetById category error:', err)
        throw err
    }
}

export async function rGetBySlug(slug) {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) throw error
        return data
    } catch (err) {
        console.error('rGetBySlug category error:', err)
        throw err
    }
}
