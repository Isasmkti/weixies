import { rGetCartWithCreation, rGetCartItems, rAddToCart, rRemoveFromCart } from '../repositories/cartRepository'

export async function sGetCart(profileId) {
    try {
        const cart = await rGetCartWithCreation(profileId)
        const items = await rGetCartItems(cart.id)
        return { cart, items }
    } catch (error) {
        throw error
    }
}

export async function sAddToCart(profileId, productId) {
    try {
        // Ensure cart exists
        const cart = await rGetCartWithCreation(profileId)
        await rAddToCart(cart.id, productId)
        // Return updated cart items
        return await rGetCartItems(cart.id)
    } catch (error) {
        throw error
    }
}

export async function sRemoveFromCart(itemId) {
    try {
        await rRemoveFromCart(itemId)
    } catch (error) {
        throw error
    }
}
