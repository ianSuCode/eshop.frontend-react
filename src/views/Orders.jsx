import { useState, useEffect } from 'react'
import fetchHelper from '../helpers/fetchHelper'
import { Link } from 'react-router-dom'

const Orders = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchHelper.get('order')
        setOrders(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  const dusplayDateTime = text => {
    return text.substring(0, 19).replaceAll('-', '/').replace('T', ' ')
  }

  const displayId = id => {
    if (typeof id === 'string' && id.length > 6) return id.substring(0, 6) + '...'
    return id
  }
  return (
    <table className="orders">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Count</th>
          <th>Created time</th>
          <th>Updated time</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{displayId(order.id)}</td>
            <td>
              <Link to={`/product/${order.product.id}`}>{order.product.name}</Link>
            </td>
            <td>{order.product.price}</td>
            <td>{order.count}</td>
            <td>{dusplayDateTime(order.createdAt)}</td>
            <td>{dusplayDateTime(order.updatedAt)}</td>
            <td>{order.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Orders