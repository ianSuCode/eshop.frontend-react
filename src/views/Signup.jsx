import { useState } from 'react'
import LoginForm from '../components/LoginForm'

const apiUrl = `${import.meta.env.VITE_API_URL}/api`

const Signup = () => {
  const [message, setMessage] = useState(null)
  const handleSubmit = async (loginData) => {
    const payload = { email: loginData.email, password: loginData.password }
    const res = await fetch(`${apiUrl}/user`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const result = await res.json()

    if (res.status === 201) {
      setMessage(`Created user(${loginData.email}) successful`)
    } else if (res.status !== 500) {
      setMessage(result.message)
    }
  }
  return (
    <>
      <div className="center">
        <div>
          <h1>Signup</h1>
          <LoginForm onSubmit={handleSubmit} />
          {message && <p className="error">{message}</p>}
        </div>
      </div>
    </>
  )
}

export default Signup