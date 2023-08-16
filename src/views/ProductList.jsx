import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, useCart } from '../hooks'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { accessToken } = useAuth()
  const { add } = useCart()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${apiUrl}/product`)
        const data = await res.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAddToCart = (product) => {
    add(product)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>List</h2>
      <div className="products">
        {products && products.map((product) => (
          <div className="product-box" key={product.id}>
            <div className="product-head">
              <Link to={`/product/${product.id}`} state={product}>{product.name}</Link>
            </div>
            <div className="product-body">
              <p>Price: ${product.price}</p>
            </div>
            <div className="product-foot">
              {accessToken && <a onClick={() => handleAddToCart(product)}>Add to cart</a>}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ProductList