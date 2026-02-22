import { supabase } from '../lib/supabase'

export async function rAll(
    page = 1,
    limit = 10,
    sortBy = 'created_at',
    sortOrder = 'desc',
    search = ''
) {
    try {
        const from = (page - 1) * limit
        const to = from + limit - 1

        // ✅ 1. buat query dulu
        let query = supabase
            .from('products')
            .select('*', { count: 'exact' })
            .order(sortBy, { ascending: sortOrder === 'asc' })

        // ✅ 2. apply search SEBELUM dieksekusi
        if (search && search.trim() !== '') {
            query = query.or(
                `name.ilike.%${search}%,description.ilike.%${search}%`
            )
        }

        // ✅ 3. baru eksekusi query
        const { data, error, count } = await query.range(from, to)

        if (error) throw error

        return {
            data,
            total: count,
            page,
            limit
        }
    } catch (err) {
        console.error('rAll products error:', err)
        throw err
    }
}




export async function rGetById(id) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    } catch (err) {
        console.error('rGetById product error:', err)
        throw err
    }
}



export async function rGetBySlug(slug) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) throw error
        return data
    } catch (err) {
        console.error('rGetBySlug product error:', err)
        throw err
    }
}

export async function rCreate(product) {
    try {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select()
            .single()

        if (error) throw error
        return data
    } catch (err) {
        console.error('rCreate product error:', err)
        throw err
    }
}

export async function rUpdate(id, product) {
    try {
        const { data, error } = await supabase
            .from('products')
            .update(product)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    } catch (err) {
        console.error('rUpdate product error:', err)
        throw err
    }
}

export async function rDelete(id) {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)

        if (error) throw error
        return true
    } catch (err) {
        console.error('rDelete product error:', err)
        throw err
    }
}
