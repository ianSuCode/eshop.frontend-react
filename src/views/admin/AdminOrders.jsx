import { useState, useEffect } from 'react'
import fetchHelper from '../../helpers/fetchHelper'

const AdminOrders = () => {
  const [orderGroups, setOrderGroups] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchHelper.get('admin/order')
        setOrderGroups(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleStateChange = async (orderId, newState) => {
    const result = await fetchHelper.patch('admin/order/change-state', { id: orderId, state: newState })
    const newOrderGroups = orderGroups.map(orderGroup => {
      orderGroup.orders = orderGroup.orders.map(o => {
        if (o.id === orderId) {
          return { ...o, state: newState, updatedAt: result.updatedAt }
        }
        return o
      })
      return orderGroup
    })
    setOrderGroups(newOrderGroups)
  }

  const handleDelete = async (orderId) => {
    await fetchHelper.delete(`admin/order/${orderId}`)
    let orderGroupToRemove
    let newOrderGroups = orderGroups.map(orderGroup => {
      const newOrders = orderGroup.orders.filter(o => o.id !== orderId)
      if (newOrders.length === 0) orderGroupToRemove = orderGroup
      return { ...orderGroup, orders: newOrders }
    })
    if (orderGroupToRemove) {
      newOrderGroups = newOrderGroups.filter(orderGroup => orderGroup !== orderGroupToRemove)
    }
    setOrderGroups(newOrderGroups)
  }


  const dusplayDateTime = text => {
    return text.substring(0, 19).replaceAll('-', '/').replace('T', ' ')
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Product</th>
          <th>Count</th>
          <th>Created time</th>
          <th>Updated time</th>
          <th>State</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          orderGroups.map((orderGroup) => (
            orderGroup.orders?.map((order, orderIndex) => {
              return (
                <tr key={order.id}>
                  {orderIndex === 0 && <td rowSpan={orderGroup.orders.length}>{orderGroup.userEmail}</td>}
                  <td>
                    <span>{order.product.name}</span>
                    <br />
                    <span>$ {order.product.price}</span>
                  </td>
                  <td>{order.count}</td>
                  <td>{dusplayDateTime(order.createdAt)}</td>
                  <td>{dusplayDateTime(order.updatedAt)}</td>
                  <td>
                    <select value={order.state} onChange={(e) => handleStateChange(order.id, e.target.value)}>
                      <option value="new">new</option>
                      <option value="processing">processing</option>
                      <option value="shipping">shipping</option>
                      <option value="done">done</option>
                      <option value="done">cancel</option>
                    </select>
                  </td>
                  <td><button onClick={() => handleDelete(order.id)}>Delete</button></td>
                </tr>
              )
            })
          ))
        }
      </tbody>
    </table>
  )
}

export default AdminOrders