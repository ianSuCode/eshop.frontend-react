import { NavLink, Outlet } from 'react-router-dom'

const Account = () => {
  return (
    <>
      <nav className="sub-nav">
        <NavLink to="/account/profile">Profile</NavLink>
        <NavLink to="/account/orders">Orders</NavLink>
      </nav>
      <Outlet />
    </>
  )
}

export default Account