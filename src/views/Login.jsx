import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useCart } from '../hooks'
import LoginForm from '../components/LoginForm'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

const Login = () => {
  const [message, setMessage] = useState(null)
  const { login } = useAuth()
  const { retrieveItems } = useCart()
  const navigate = useNavigate()
  const handleSubmit = (loginData) => {
    async function fetchData() {
      try {
        const option = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginData.email, password: loginData.password })
        }
        const res = await fetch(`${apiUrl}/auth/login`, option)
        if (res.status === 401) {
          setMessage('Unauthorized')
        } else {
          setMessage(null)
          const result = await res.json()
          login(result.userInfo, result.accessToken)
          localStorage.setItem('accessToken', result.accessToken)
          retrieveItems()
          navigate('/')
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error')
      }
    }
    fetchData()
  }
  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
      { message && <p className="message error">{ message }</p>}
    </>
  )
}

export default Login