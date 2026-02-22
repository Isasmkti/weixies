import { supabase } from '../lib/supabase'

export async function rGetCartWithCreation(profileId) {
    try {
        let { data, error } = await supabase
            .from('cart')
            .select('*')
            .eq('profile_id', profileId)
            .single()

        if (error) {
            // If cart not found, create it
            const { data: newCart, error: createError } = await supabase
                .from('cart')
                .insert([{ profile_id: profileId }])
                .select()
                .single()

            if (createError) throw createError
            return newCart
        }
        return data
    } catch (error) {
        console.error('rGetCart error:', error)
        throw error
    }
}

export async function rGetCartItems(cartId) {
    try {
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
                *,
                product:products (*)
            `)
            .eq('cart_id', cartId)
            .order('created_at', { ascending: true })

        if (error) throw error
        return data
    } catch (err) {
        console.error('rGetCartItems error:', err)
        throw err
    }
}

export async function rAddToCart(cartId, productId) {
    try {
        const { data, error } = await supabase
            .from('cart_items')
            .insert([{ cart_id: cartId, product_id: productId }])
            .select()
            .single()

        if (error) throw error
        return data
    } catch (err) {
        console.error('rAddToCart error:', err)
        throw err
    }
}

export async function rRemoveFromCart(itemId) {
    try {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId)

        if (error) throw error
        return true
    } catch (err) {
        console.error('rRemoveFromCart error:', err)
        throw err
    }
}
