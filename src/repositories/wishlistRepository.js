import { supabase } from '../lib/supabase'

export async function rGetWishlists(profileId) {
    try {
        const { data, error } = await supabase
            .from('wishlists')
            .select(`
                *,
                product:products (*, product_images(*))
            `)
            .eq('profile_id', profileId)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    } catch (err) {
        console.error('rGetWishlists error:', err)
        throw err
    }
}

export async function rAddWishlist(profileId, productId) {
    try {
        const { data, error } = await supabase
            .from('wishlists')
            .insert([{ profile_id: profileId, product_id: productId }])
            .select()
            .maybeSingle()

        if (error) throw error
        return data
    } catch (err) {
        console.error('rAddWishlist error:', err)
        throw err
    }
}

export async function rRemoveWishlist(profileId, productId) {
    try {
        const { error } = await supabase
            .from('wishlists')
            .delete()
            .eq('profile_id', profileId)
            .eq('product_id', productId)

        if (error) throw error
        return true
    } catch (err) {
        console.error('rRemoveWishlist error:', err)
        throw err
    }
}
