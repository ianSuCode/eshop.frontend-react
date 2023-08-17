import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

const AdminRoute = ({ userInfo, children }) => {
  if (userInfo?.roles?.includes('Admin')) {
    return children ? children : <Outlet />
  }
  return <Navigate to="/auth/login" replace />
}

AdminRoute.propTypes = {
  userInfo: PropTypes.object,
  children: PropTypes.node.isRequired
}

export default AdminRoute