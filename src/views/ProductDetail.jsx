import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'

import { useAuth, useCart } from '../hooks'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

const ProductDetail = () => {
  const { productId } = useParams()
  const location = useLocation()
  const [product, setProduct] = useState(location.state)
  const { accessToken } = useAuth()
  const { add } = useCart()
  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!product) {
          const res = await fetch(`${apiUrl}/product/${productId}`)
          const fetchedProduct = await res.json()
          setProduct(fetchedProduct)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchProduct()
  }, [productId, product])

  const handleAddToCart = (product) => {
    add(product)
  }

  if (!product) {
    return <div>Loading product details...</div>
  }
  return (
    <>
      <h2>Detail</h2>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <span>$ {product.price}</span>
        <div>
          {accessToken && <button onClick={() => handleAddToCart(product)}>Add to cart</button>}
        </div>
      </div>
    </>
  )
}

export default ProductDetail