/**
 * WooCommerce Cart Integration Service
 * Handles cart synchronization with WooCommerce backend
 */

const WC_API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://www.gaaka.com/dev';
const WC_CART_ENDPOINT = `${WC_API_BASE}/wp-json/wc/store/v1/cart`;
const WC_CHECKOUT_URL = `${WC_API_BASE}/checkout`;

export interface WooCommerceCartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  price: string;
  totals: {
    line_subtotal: string;
    line_total: string;
  };
  images: Array<{
    src: string;
    alt: string;
  }>;
}

export interface WooCommerceCart {
  items: WooCommerceCartItem[];
  totals: {
    total_items: string;
    total_items_tax: string;
    total_fees: string;
    total_fees_tax: string;
    total_discount: string;
    total_discount_tax: string;
    total_shipping: string;
    total_shipping_tax: string;
    total_tax: string;
    total_price: string;
  };
  needs_shipping: boolean;
  items_count: number;
}

/**
 * Add item to WooCommerce cart
 */
export async function addToWooCommerceCart(
  productId: number,
  quantity: number = 1,
  variationId?: number
): Promise<{ success: boolean; error?: string; cart?: WooCommerceCart }> {
  try {
    const response = await fetch(`${WC_CART_ENDPOINT}/add-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for session cookies
      body: JSON.stringify({
        id: productId,
        quantity,
        ...(variationId && { variation_id: variationId }),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to add item to cart',
      };
    }

    const cart = await response.json();
    return { success: true, cart };
  } catch (error) {
    console.error('Add to cart error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(
  itemKey: string,
  quantity: number
): Promise<{ success: boolean; error?: string; cart?: WooCommerceCart }> {
  try {
    const response = await fetch(`${WC_CART_ENDPOINT}/items/${itemKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to update cart',
      };
    }

    const cart = await response.json();
    return { success: true, cart };
  } catch (error) {
    console.error('Update cart error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(
  itemKey: string
): Promise<{ success: boolean; error?: string; cart?: WooCommerceCart }> {
  try {
    const response = await fetch(`${WC_CART_ENDPOINT}/items/${itemKey}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to remove item',
      };
    }

    const cart = await response.json();
    return { success: true, cart };
  } catch (error) {
    console.error('Remove from cart error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}

/**
 * Get current cart
 */
export async function getCart(): Promise<{
  success: boolean;
  error?: string;
  cart?: WooCommerceCart;
}> {
  try {
    const response = await fetch(WC_CART_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to fetch cart',
      };
    }

    const cart = await response.json();
    return { success: true, cart };
  } catch (error) {
    console.error('Get cart error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}

/**
 * Clear cart
 */
export async function clearCart(): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${WC_CART_ENDPOINT}/items`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Failed to clear cart',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Clear cart error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}

/**
 * Get WooCommerce checkout URL
 */
export function getCheckoutUrl(): string {
  return WC_CHECKOUT_URL;
}

/**
 * Apply coupon code
 */
export async function applyCoupon(
  code: string
): Promise<{ success: boolean; error?: string; cart?: WooCommerceCart }> {
  try {
    const response = await fetch(`${WC_CART_ENDPOINT}/apply-coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Invalid coupon code',
      };
    }

    const cart = await response.json();
    return { success: true, cart };
  } catch (error) {
    console.error('Apply coupon error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}

/**
 * Remove coupon
 */
export async function removeCoupon(
  code: string
): Promise<{ success: boolean; error?: string; cart?: WooCommerceCart }> {
  try {
    const response = await fetch(`${WC_CART_ENDPOINT}/remove-coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || 'Failed to remove coupon',
      };
    }

    const cart = await response.json();
    return { success: true, cart };
  } catch (error) {
    console.error('Remove coupon error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}
