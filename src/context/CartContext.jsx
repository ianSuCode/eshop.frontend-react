import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

import fetchHelper from '../helpers/fetchHelper'

export const CartContext = createContext()

const initialCartItems = []

const cartReducer = (cartItems, action) => {
  console.log(action)
  switch (action.type) {
    case 'SETUP':
      return action.items
    case 'ADD':
      return [...cartItems, action.item]
    case 'CHANGE_COUNT':
      return cartItems.map(item => {
        if (item.product.id === action.productId) return { ...item, count: action.count }
        return item
      })
    case 'REMOVE':
      return cartItems.filter(item => item.product.id !== action.productId)

    // Add more cases for other actions like removing items, clearing cart, etc.
    default:
      return cartItems
  }
}



export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, initialCartItems);

  const retrieveItems = async () => {
    console.log('retrieve cart items')
    const items = await fetchHelper.get('cart')
    dispatch({ type: 'SETUP', items })
  }

  const add = async (product) => {
    const itemIndex = cartItems.findIndex(it => it.product.id === product.id)
    const count = itemIndex === -1 ? 1 : cartItems[itemIndex].count + 1
    await fetchHelper.post('cart', { productId: product.id, count })

    if (itemIndex === -1) {
      dispatch({ type: 'ADD', item: { product, count: 1 } })
    } else {
      const cartItem = cartItems[itemIndex]
      dispatch({ type: 'CHANGE_COUNT', productId: cartItem.product.id, count: cartItem.count + 1 })
    }
  }

  const updateCount = async (productId, count) => {
    if (count < 1) {
      await fetchHelper.delete(`cart/remove/${productId}`)
      dispatch({ type: 'REMOVE', productId })
    } else {
      await fetchHelper.post('cart', { productId, count })
      dispatch({ type: 'CHANGE_COUNT', productId, count })
    }
  }

  const clearAll = async () => {
    await fetchHelper.delete('cart/clear')
    dispatch({ type: 'SETUP', items: [] })
  }

  const checkout = async (productIds) => {
    await fetchHelper.post('order', productIds)
    const remainCartItems = cartItems.filter(it => !productIds.includes(it.product.id))
    dispatch({ type: 'SETUP', items: remainCartItems })
  }

  return (
    <CartContext.Provider value={{ cartItems, retrieveItems, add, updateCount, clearAll, checkout }}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
}
