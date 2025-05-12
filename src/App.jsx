import { Routes, Route, NavLink } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAuth, useCart } from './hooks'
import Home from './views/Home'
import ProductList from './views/ProductList'
import ProductDetail from './views/ProductDetail'
import Cart from './views/Cart'
import Account from './views/Account'
import Profile from './views/account/AccountProfile'
import Orders from './views/account/AccountOrders'
import Signup from './views/Signup'
import Login from './views/Login'
import Admin from './views/Admin'
import AdminUsers from './views/admin/AdminUsers'
import AdminOrders from './views/admin/AdminOrders'
import { ProtectedRoute, AdminRoute } from './routes'

function App() {
  const { userInfo, accessToken, logout, retrieveUserInfo } = useAuth()
  const { cartItems, retrieveItems } = useCart()
  const init = async () => {
    if (accessToken && !userInfo) {
      await retrieveUserInfo()
      await retrieveItems()
    }
  }
  init()

  const isAdmin = userInfo?.roles?.includes('Admin')

  const AdminPage = () => {
    if (isAdmin) {
      return (
        <NavLink to="/admin">Admin</NavLink>
      )
    }
  }

  return (
    <>
      <header>
        <div>
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <div>
          <h2>iansucode.eshop</h2>
          <h3>
            created by Vite + React
          </h3>
        </div>
        <nav>
          <NavLink to="/" >Home</NavLink>
          <NavLink to="/product">Product</NavLink>
          {accessToken
            ? <>
              {AdminPage()}
              <NavLink to="/cart">Cart ({cartItems.length})</NavLink>
              <NavLink to="/account">Account</NavLink>
              <a onClick={logout}>Logout</a>
            </>
            : <>
              <NavLink to="/user/signup">Signup</NavLink>
              <NavLink to="/auth/login">Login</NavLink>
            </>
          }
        </nav>
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="product">
            <Route path="" element={<ProductList />} />
            <Route path=":productId" element={<ProductDetail />} />
          </Route>
          <Route path="cart" element={<Cart />} ></Route>
          <Route path="account" element={<ProtectedRoute userInfo={userInfo}><Account /></ProtectedRoute>} >
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="user/signup" element={<Signup />} ></Route>
          <Route path="auth/login" element={<Login />} ></Route>
          <Route path="admin" element={<AdminRoute userInfo={userInfo}><Admin /></AdminRoute>} >
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}


export default App

