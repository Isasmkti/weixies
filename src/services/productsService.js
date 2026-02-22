import { rAll, rGetById, rGetBySlug, rCreate, rUpdate, rDelete } from '../repositories/productsRepository'

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

export async function sCreate(product) {
    try {
        return await rCreate(product)
    } catch (error) {
        throw error
    }
}

export async function sUpdate(id, product) {
    try {
        return await rUpdate(id, product)
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
