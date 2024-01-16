import React from 'react'
import Layout from './components/layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import PageNotFound from './components/pagenotfound/PageNotFound'
import Register from './pages/auth/register/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/login/Login'
import Dashboard from './pages/auth/user/Dashboard'
import PrivateRoute from './pages/routes/PrivateRoute'
import AdminRoute from './pages/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import CreateProduct from './pages/admin/CreateProduct'
import CreateCategory from './pages/admin/CreateCategory'
import UserProfile from './pages/auth/user/UserProfile'
import UserOrder from './pages/auth/user/UserOrder'
import Products from './pages/admin/Products'
import Update from './pages/admin/Update'
import ProductDetails from './components/ProductDetails'
import Cart from './pages/cart/Cart'
import Profile from './pages/auth/user/UserProfile'


const App = () => {
  return (
    <Layout>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/home/:slug" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<UserOrder />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/get-products" element={<Products />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/products/:slug" element={<Update />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  );
}

export default App
