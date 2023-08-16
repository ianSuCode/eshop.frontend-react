import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
  const navigate = useNavigate()
  const login = (userInfo, accessToken) => {
    setUserInfo(userInfo)
    setAccessToken(accessToken)
  }

  const logout = () => {
    setUserInfo(null)
    setAccessToken('')
    localStorage.removeItem('accessToken')
    navigate('/')
  }

  const retrieveUserInfo = async () => {
    console.log('retrieve user info')
    try {
      const res = await fetch(`${apiUrl}/auth/user-info/${accessToken}`)
      const result = await res.json()
      if (res.status === 200) {
        setUserInfo(result)
      } else {
        logout()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ userInfo, accessToken, login, logout, retrieveUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

