import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth, useCart } from '../hooks'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

const ProductList = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { accessToken } = useAuth()
  const { add } = useCart()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const selectedCategoryId = queryParams.get('categoryId')

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${apiUrl}/category`)
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching category data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const categoryQuery = selectedCategoryId ? `?categoryId=${selectedCategoryId}` : ''
        const res = await fetch(`${apiUrl}/product${categoryQuery}`)
        const data = await res.json()
        setProducts(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedCategoryId])

  const handleAddToCart = (product) => {
    add(product)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <nav className="sub-nav">
        <Link to="/product" className={selectedCategoryId ? '' : 'active'}>All</Link>
        {
          categories && categories.map(it => (
            <Link
              key={it.id}
              to={`/product?categoryId=${it.id}`}
              className={it.id === selectedCategoryId ? 'active' : ''}
            >{it.name}
            </Link>
          ))
        }
      </nav>
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