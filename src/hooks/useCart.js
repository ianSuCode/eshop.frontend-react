import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default () => {
  return useContext(CartContext)
}
