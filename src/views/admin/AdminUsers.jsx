import { useState, useEffect } from 'react'
import fetchHelper from '../../helpers/fetchHelper'

const AdminUsers = () => {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchHelper.get('admin/user')
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
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

  const handleDeleteUser = async user => {
    try {
      await fetchHelper.delete(`admin/user/${user.id}`)
      setUsers(users.filter(it => it.id !== user.id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleAcitveChange = async user => {
    try {
      await fetchHelper.patch('admin/user/active', { id: user.id, active: !user.active })
      user.active = !user.active
      setUsers(users.map(it => it === user.id ? {...it, active: !user.active} : it))
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Roles</th>
          <th>Created At</th>
          <th>Active</th>
          <th>Orders</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          users && users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.roles?.join(',')}</td>
              <td>{dusplayDateTime(user.createdAt)}</td>
              <td>
                <div className="switch-container">
                  <input type="checkbox" id={`toggle-switch-${user.id}`} className="toggle-input"
                    onChange={() => handleAcitveChange(user)} 
                    checked={user.active}/>
                  <label htmlFor={`toggle-switch-${user.id}`} className="toggle-label"></label>
                </div>
              </td>
              <td>
                <ul>
                  {user.orders && user.orders.map(order => (<li key={order.id}>{displayId(order.id)} [{order.state}]</li>))}
                </ul>
              </td>
              <td><button onClick={() => handleDeleteUser(user)}>Delete</button></td >
            </tr >
          ))
        }
      </tbody>
    </table >
  )
}

export default AdminUsers