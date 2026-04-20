import { supabase } from '../lib/supabase'

export async function rAll(
    page = 1,
    limit = 10,
    sortBy = 'created_at',
    sortOrder = 'desc',
    search = '',
    categorySlug = ''
) {
    try {
        const from = (page - 1) * limit
        const to = from + limit - 1

        let select = '*, product_images(*), reviews(*)'
        
        // Joining through the product_categories pivot table
        if (categorySlug && categorySlug.trim() !== '') {
            select += ', product_categories!inner(category_id, categories!inner(*))'
        } else {
            select += ', product_categories(category_id, categories(*))'
        }

        // 1. Initialize query
        let query = supabase
            .from('products')
            .select(select, { count: 'exact' })
            .order(sortBy, { ascending: sortOrder === 'asc' })

        // 2. Apply search
        if (search && search.trim() !== '') {
            query = query.or(
                `name.ilike.%${search}%,description.ilike.%${search}%`
            )
        }

        // 3. Apply category filter through the pivot relationship
        if (categorySlug && categorySlug.trim() !== '') {
            query = query.eq('product_categories.categories.slug', categorySlug)
        }

        // 4. Execute query with pagination
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
            .select('*, product_images(*), product_categories(category_id, categories(*)), reviews(*)')
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
            .select('*, product_images(*), product_categories(category_id, categories(*)), reviews(*)')
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

export async function sCreate(product, images, categoryIds = []) {
    try {
        const newProduct = await rCreate(product)

        if (images?.length) {
            await rUpsertImages(newProduct.id, normalizeImages(images))
        }

        if (categoryIds?.length) {
            await rUpsertProductCategories(newProduct.id, categoryIds)
        }

        return await rGetById(newProduct.id)
    } catch (error) {
        console.error('sCreate error:', error)
        throw error
    }
}

export async function sUpdate(id, product, images, categoryIds = []) {
    try {
        await rUpdate(id, product)

        if (images) {
            await rUpsertImages(id, normalizeImages(images))
        }

        if (categoryIds) {
            await rUpsertProductCategories(id, categoryIds)
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

export async function rUpsertProductCategories(productId, categoryIds) {
    try {
        // 1. Get existing categories for this product
        const { data: existing, error: fetchError } = await supabase
            .from('product_categories')
            .select('category_id')
            .eq('product_id', productId)

        if (fetchError) throw fetchError

        const existingCategoryIds = existing.map(i => i.category_id)

        // 2. Identify categories to add and remove
        const toAdd = categoryIds.filter(id => !existingCategoryIds.includes(id))
        const toRemove = existingCategoryIds.filter(id => !categoryIds.includes(id))

        // 3. REMOVE deselected categories
        if (toRemove.length > 0) {
            const { error } = await supabase
                .from('product_categories')
                .delete()
                .eq('product_id', productId)
                .in('category_id', toRemove)

            if (error) throw error
        }

        // 4. ADD new categories
        if (toAdd.length > 0) {
            const { error } = await supabase
                .from('product_categories')
                .insert(
                    toAdd.map(categoryId => ({
                        product_id: productId,
                        category_id: categoryId
                    }))
                )

            if (error) throw error
        }
    } catch (err) {
        console.error('rUpsertProductCategories error:', err)
        throw err
    }
}