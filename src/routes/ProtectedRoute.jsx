import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ userInfo, children }) => {
  if (userInfo) {
    return children ? children : <Outlet />
  }
  return <Navigate to="/auth/login" replace />
}

ProtectedRoute.propTypes = {
  userInfo: PropTypes.object,
  children: PropTypes.node.isRequired
}

export default ProtectedRoute