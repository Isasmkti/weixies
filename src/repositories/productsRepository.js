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
            .select('*, product_images(*)', { count: 'exact' })
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
            .select('*, product_images(*)')
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
            .select('*, product_images(*)')
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
function normalizeImages(images) {
    if (!images || images.length === 0) return []

    let foundPrimary = false;
    const result = images.map((img, idx) => {
        // If already primary and not found yet, mark as primary
        if (img.is_primary && !foundPrimary) {
            foundPrimary = true;
            return { ...img, is_primary: true };
        }
        // If no primary found, mark first image as primary
        if (!foundPrimary && idx === 0) {
            foundPrimary = true;
            return { ...img, is_primary: true };
        }
        return { ...img, is_primary: false };
    });
    return result;
}

export async function sCreate(product, images) {
    try {
        const newProduct = await rCreate(product)

        if (images?.length) {
            await rUpsertImages(newProduct.id, normalizeImages(images))
        }

        return await rGetById(newProduct.id)
    } catch (error) {
        console.error('sCreate error:', error)
        throw error
    }
}

export async function sUpdate(id, product, images) {
    try {
        await rUpdate(id, product)

        if (images) {
            await rUpsertImages(id, normalizeImages(images))
        }

        return await rGetById(id)
    } catch (error) {
        console.error('sUpdate error:', error)
        throw error
    }
}


export async function rUpsertImages(productId, images) {
    try {
        if (!images || images.length === 0) return

        // 1. ambil existing
        const { data: existing, error: fetchError } = await supabase
            .from('product_images')
            .select('id')
            .eq('product_id', productId)

        if (fetchError) throw fetchError

        const existingIds = existing.map(i => i.id)
        const incomingIds = images.filter(i => i.id).map(i => i.id)

        // 2. DELETE yang tidak ada di incoming
        const toDelete = existingIds.filter(id => !incomingIds.includes(id))

        if (toDelete.length > 0) {
            const { error } = await supabase
                .from('product_images')
                .delete()
                .in('id', toDelete)

            if (error) throw error
        }

        // 3. SPLIT insert & update
        const toInsert = []
        const toUpdate = []

        for (const img of images) {
            if (!img.image_url) {
                throw new Error('image_url is required')
            }

            if (img.id) {
                toUpdate.push(img)
            } else {
                toInsert.push(img)
            }
        }

        // 4. INSERT
        if (toInsert.length > 0) {
            const { error } = await supabase
                .from('product_images')
                .insert(
                    toInsert.map(img => ({
                        product_id: productId,
                        image_url: img.image_url,
                        is_primary: img.is_primary
                    }))
                )

            if (error) throw error
        }

        // 5. UPDATE (IMPORTANT: filter by product_id juga)
        for (const img of toUpdate) {
            const { error } = await supabase
                .from('product_images')
                .update({
                    image_url: img.image_url,
                    is_primary: img.is_primary
                })
                .eq('id', img.id)
                .eq('product_id', productId) // 🔥 penting

            if (error) throw error
        }
    } catch (err) {
        console.error('rUpsertImages error:', err)
        throw err
    }
}