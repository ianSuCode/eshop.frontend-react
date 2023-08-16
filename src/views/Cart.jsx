import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks'

const Cart = () => {
  const [checkedProductIds, setCheckedProductIds] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const { cartItems, updateCount, clearAll, checkout } = useCart()

  const handleCheckProductId = productId => {
    const index = checkedProductIds.findIndex(it => it === productId)
    const newCheckedProductIds = index > -1
      ? checkedProductIds.filter(it => it !== productId)
      : [...checkedProductIds, productId]
    setCheckedProductIds(newCheckedProductIds)
    const newTotalCost = cartItems
      .filter(it => newCheckedProductIds.includes(it.product.id))
      .reduce((total, current) => total + current.product.price * current.count, 0)
    setTotalCost(newTotalCost)
  }

  const handleClearAll = () => {
    clearAll()
    setCheckedProductIds([])
    setTotalCost(0)
  }

  const handleCheckout = () => {
    if (checkedProductIds.length > 0) {
      checkout(checkedProductIds)
    }
  }

  return (
    <>
      <h1>Cart</h1>
      <div>
        <a onClick={handleClearAll}>Clear All</a>
        <span> | </span>
        <a onClick={handleCheckout}>Check out ({checkedProductIds.length})</a>
      </div>
      <div className="carts">
        <div>
          <div></div>
          <span>Name</span>
          <span>Price</span>
          <span>Count</span>
        </div>
        {cartItems && cartItems.map(item => (
          <div key={item.product.id}>
            <div>
              <input type="checkbox" value={item.product.id} onChange={(event) => handleCheckProductId(event.target.value)} />
            </div>
            <div><Link to={`/product/${item.product.id}`}>{item.product.name}</Link></div>
            <div>{item.product.price}</div>
            <div><input type="number" value={item.count} min="0" onChange={(event) => updateCount(item.product.id, +event.target.value)} /></div>
          </div>
        ))}
        <div>
          <span>Total Cost: {totalCost}</span>
        </div>
      </div>
    </>
  )
}

export default Cart