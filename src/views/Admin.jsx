import { NavLink, Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <>
      <nav className="sub-nav">
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
      </nav>
      <Outlet />
    </>
  )
}

export default Admin