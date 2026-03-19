import { rAll, rGetById, rGetBySlug, rCreate, rUpdate, rDelete, rUpsertImages } from '../repositories/productsRepository'

export async function sAll(page, limit, sortBy, sortOrder, search) {
    try {
        return await rAll(page, limit, sortBy, sortOrder, search)
    } catch (error) {
        throw error
    }
}

export async function sGetById(id) {
    try {
        const data = await rGetById(id)
        return data
    } catch (error) {
        throw error
    }
}

export async function sGetBySlug(slug) {
    try {
        const data = await rGetBySlug(slug)
        return data
    } catch (error) {
        throw error
    }
}

export async function sCreate(product, images) {
    try {
        const newProduct = await rCreate(product)
        if (newProduct && images) {
            await rUpsertImages(newProduct.id, images)
            return await rGetById(newProduct.id)
        }
        return newProduct
    } catch (error) {
        throw error
    }
}

export async function sUpdate(id, product, images) {
    try {
        const updatedProduct = await rUpdate(id, product)
        if (updatedProduct && images) {
            await rUpsertImages(id, images)
            return await rGetById(id)
        }
        return updatedProduct
    } catch (error) {
        throw error
    }
}

export async function sDelete(id) {
    try {
        return await rDelete(id)
    } catch (error) {
        throw error
    }
}
