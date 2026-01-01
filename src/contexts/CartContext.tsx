// Cart Context for managing shopping cart state with SSR safety
import React, { createContext, useContext, useReducer, useEffect } from 'react'

export interface CartItem {
  cartId: string // Unique identifier for the cart item (e.g., 'product-id-color-size')
  id: string
  name: string
  price: number
  image: string
  quantity: number
  weight?: number // Weight in kg for shipping calculations
  color?: string
  size?: string
  variant?: string // More specific than just color/size
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isOpen: boolean
  isHydrated: boolean // Track hydration status for SSR safety
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity' | 'cartId'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { cartId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { cartId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_HYDRATED'; payload: boolean }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
  isHydrated: false
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Generate a unique ID for the cart item based on product ID and variants
      const cartId = [
        action.payload.id,
        action.payload.color,
        action.payload.size,
      ]
        .filter(Boolean)
        .join('-')

      const existingItemIndex = state.items.findIndex(
        item => item.cartId === cartId
      )

      let newItems: CartItem[]
      const quantityToAdd = action.payload.quantity || 1

      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        )
      } else {
        newItems = [
          ...state.items,
          { ...action.payload, quantity: quantityToAdd, cartId },
        ]
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.cartId !== action.payload.cartId)
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.cartId === action.payload.cartId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0)

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case 'LOAD_CART':
      const total = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      return {
        ...state,
        items: action.payload,
        total,
        itemCount
      }

    case 'SET_HYDRATED':
      return {
        ...state,
        isHydrated: action.payload
      }

    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'quantity' | 'cartId'> & { quantity?: number }) => void
  removeItem: (cartId: string) => void
  updateQuantity: (cartId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Handle hydration safely
  useEffect(() => {
    // Mark as hydrated
    dispatch({ type: 'SET_HYDRATED', payload: true })
    
    // Load cart from localStorage only after hydration
    try {
      const savedCart = localStorage.getItem('gaaka-cart')
      if (savedCart) {
        const cartItems = JSON.parse(savedCart)
        // Validate cart items structure
        if (Array.isArray(cartItems)) {
          dispatch({ type: 'LOAD_CART', payload: cartItems })
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
      // Clear corrupted cart data
      localStorage.removeItem('gaaka-cart')
    }
  }, [])

  // Save cart to localStorage whenever it changes (but only after hydration)
  useEffect(() => {
    if (state.isHydrated) {
      try {
        localStorage.setItem('gaaka-cart', JSON.stringify(state.items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [state.items, state.isHydrated])

  const addItem = (item: Omit<CartItem, 'quantity' | 'cartId'> & { quantity?: number }) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }

  const removeItem = (cartId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { cartId } })
  }

  const updateQuantity = (cartId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}