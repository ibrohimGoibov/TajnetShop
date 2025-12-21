import React from 'react'
import Layout from './layout/layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LogIn from './store/api/accountApi/logIn'
import Register from './store/api/accountApi/register'
import Home from './store/api/pageApi/home'
import About from './store/api/pageApi/about'
import Product from './store/api/productApi/product'
import Error from './store/api/errorApi/error'
import Products from './store/api/productApi/product'
import ProductById from './store/api/productApi/productById'
import Cart from './store/api/cartApi/cart'
import CategoriesById from './store/api/categoryApi/categoriesById'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'about',
          element: <About />
        },
        {
          path: 'product',
          element: <Product />
        },
        {
          path: 'logIn',
          element: <LogIn />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'error',
          element: <Error />
        },
        {
          path: 'products',
          element: <Products />
        },
        {
          path: 'productById/:id',
          element: <ProductById />
        },
        {
          path: 'cart',
          element: <Cart />
        },
        {
          path: 'categoriesById/:id',
          element: <CategoriesById />
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App