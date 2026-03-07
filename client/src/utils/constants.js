export const ORDER_STORAGE_KEY = 'shop_order_list'

export const getCartStorageKey = (userId) => `shop_cart_${userId || 'guest'}`
