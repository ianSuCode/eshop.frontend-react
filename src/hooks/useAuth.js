import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default () => {
  return useContext(AuthContext)
}